import React, { useState, useEffect } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import getAllDisplacements from "../../Api/displacement";
import deleteDisplacement from "../../Api/displacement/delete";
import newDisplacement from "../../Api/displacement/add";
import updateDisplacement from "../../Api/displacement/update";
import DialogLoading from "../../Utils/Dialog/Loading/page";
import DialogError from "../../Utils/Dialog/Error/page";
import { useMediaQuery } from "react-responsive";
import { Container } from "../TableStyle/styles";
import Row from "./Row";
import { formFieldsDisplacement } from "../../Form/FormFields/displacement";
import getAllVehicles from "@/components/Api/vehicle";
import getAllConductors from "@/components/Api/conductor";
import getAllClients from "@/components/Api/client";
import { Client, Vehicle, Conductor, Displacement } from '@/types';

export default function CollapsibleTable() {
  const [displacements, setDisplacements] = useState<Displacement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDisplacementId, setDeleteDisplacementId] = useState<number>(0);
  const [deleteDisplacementName, setDeleteDisplacementName] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDisplacement, setDialogDisplacement] = useState<any | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [conductors, setConductors] = useState<Conductor[]>([]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    fetchData();
    fetchClients();
    fetchVehicles();
    fetchConductors();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getAllDisplacements();
      setDisplacements(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const fetchClients = async () => {
    try {
      const data = await getAllClients();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const data = await getAllVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const fetchConductors = async () => {
    try {
      const data = await getAllConductors();
      setConductors(data);
    } catch (error) {
      console.error("Error fetching conductors:", error);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setIsUpdating(false);
  };

  const handleAddNew = () => {
    setDialogDisplacement(null);
    setDialogOpen(true);
  };

  const handleEdit = (displacement: Displacement) => {
    setDialogDisplacement(displacement);
    setDialogOpen(true);
  };

  const handleSave = async (displacement: Displacement) => {
    setDialogOpen(false);

    try {
      if (displacement.id) {
        await updateDisplacement(displacement);
        setSnackbarMessage(`O deslocamento foi atualizado com sucesso!`);
      } else {
        await newDisplacement(displacement);
        setSnackbarMessage(`O deslocamento foi cadastrado com sucesso!`);
      }
      setSnackbarOpen(true);
      fetchData();
    } catch (error) {
      setSnackbarMessage(`Erro ao salvar deslocamento.`);
      setSnackbarOpen(true);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterDisplacements = () => {
    const filtered = displacements.filter((displacement) =>
      Object.values(displacement).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return filtered.sort((a, b) => b.id - a.id);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async (id: number, nome: string) => {
    setDeleteDisplacementId(id);
    setDeleteDisplacementName(nome);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteDialogOpen(false);

    try {
      const response = await deleteDisplacement(deleteDisplacementId);
      if (response) {
        setSnackbarMessage(
          `O deslocamento ${deleteDisplacementName} foi excluído com sucesso!`
        );
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarMessage(`Erro ao deletar deslocamento ${deleteDisplacementName}.`);
        setSnackbarOpen(true);
        fetchData();
      }
    } catch {
      setSnackbarMessage(`Erro ao deletar deslocamento ${deleteDisplacementName}.`);
      setSnackbarOpen(true);
      fetchData();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <DialogLoading loading={isLoading} />;
  }

  if (isError) {
    setInterval(() => {
      window.location.reload();
    }, 5000);
    return <DialogError error={isError} />;
  }

  const filteredDisplacements = filterDisplacements();
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredDisplacements.length - page * rowsPerPage);

  return (
    <Container>
      <TableContainer className="table" component={Paper}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          style={{
            marginTop: "20px",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <Grid item>
            <Typography variant="h6">Deslocamentos</Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <IconButton
                className="buttonNew"
                aria-label="add"
                color="primary"
                onClick={handleAddNew}
              >
                <AddIcon />
                <Typography>Novo Deslocamento</Typography>
              </IconButton>
              <TextField
                label="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="update"
                  color="primary"
                  disabled={isUpdating}
                  onClick={handleUpdate}
                >
                  <RefreshIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Categoria</strong>
              </TableCell>
              {!isMobile && (
                <TableCell>
                  <strong>Nº Habilitação</strong>
                </TableCell>
              )}
              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDisplacements
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((displacement) => (
                <Row
                  key={displacement.id}
                  row={displacement}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDisplacements.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirmação de exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir o deslocamento {deleteDisplacementName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>
            {dialogDisplacement?.id ? "Editar deslocamento" : "Novo deslocamento"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Preencha os campos abaixo:</DialogContentText>
            {formFieldsDisplacement.map((field) => {
              const isEditingExistingDisplacement =
                dialogDisplacement && dialogDisplacement.id;
              const value = isEditingExistingDisplacement
                ? dialogDisplacement[field.label]
                : "";

              if (field.label === "Cliente") {
                return (
                  <TextField
                    key={field.label}
                    select
                    label={field.label}
                    value={value}
                    onChange={(e) =>
                      setDialogDisplacement((prevState: any) => ({
                        ...prevState,
                        [field.label]: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  >
                    {clients.map((client) => (
                      <MenuItem key={client.id} value={client.id}>
                        {client.nome}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              } else if (field.label === "Veículo") {
                return (
                  <TextField
                    key={field.label}
                    select
                    label={field.label}
                    value={value}
                    onChange={(e) =>
                      setDialogDisplacement((prevState: any) => ({
                        ...prevState,
                        [field.label]: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  >
                    {vehicles.map((vehicle) => (
                      <MenuItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.placa}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              } else if (field.label === "Condutor") {
                return (
                  <TextField
                    key={field.label}
                    select
                    label={field.label}
                    value={value}
                    onChange={(e) =>
                      setDialogDisplacement((prevState: any) => ({
                        ...prevState,
                        [field.label]: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  >
                    {conductors.map((conductor) => (
                      <MenuItem key={conductor.id} value={conductor.id}>
                        {conductor.nome}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              } else {
                return (
                  <TextField
                    key={field.label}
                    label={field.label}
                    value={value}
                    onChange={(e) =>
                      setDialogDisplacement((prevState: any) => ({
                        ...prevState,
                        [field.label]: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                );
              }
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button
              onClick={() => handleSave(dialogDisplacement)}
              color="primary"
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </TableContainer>
    </Container>
  );
}