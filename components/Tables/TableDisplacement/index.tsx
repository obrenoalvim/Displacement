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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  MenuItem,
} from "@mui/material";
import Row from "./Row";
import { Container } from "../TableStyle/styles";
import { useMediaQuery } from "react-responsive";
import { formFieldsDisplacement } from "../../Form/FormFields/displacement";

// Icons
import NotesIcon from "@mui/icons-material/Notes";
import StartIcon from "@mui/icons-material/Start";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DialogError from "../../Utils/Dialog/Error/page";
import DialogLoading from "../../Utils/Dialog/Loading/page";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

// Functions
import getAllClients from "@/components/Api/client";
import getAllVehicles from "@/components/Api/vehicle";
import newDisplacement from "../../Api/displacement/add";
import getAllDisplacements from "../../Api/displacement";
import getAllConductors from "@/components/Api/conductor";
import updateDisplacement from "../../Api/displacement/update";
import deleteDisplacement from "../../Api/displacement/delete";

// Types
import { Client, Vehicle, Conductor, Displacement } from "@/types";

export default function CollapsibleTable() {
  const [page, setPage] = useState(0);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [conductors, setConductors] = useState<Conductor[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [displacements, setDisplacements] = useState<Displacement[]>([]);
  const [deleteDisplacementId, setDeleteDisplacementId] = useState<number>(0);
  const [dialogDisplacement, setDialogDisplacement] = useState<any | null>(
    null
  );
  const [deleteDisplacementName, setDeleteDisplacementName] =
    useState<string>("");

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

  const fetchAll = () => {
    fetchData();
    fetchClients();
    fetchVehicles();
    fetchConductors();
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      setIsError(true);
    }
    setIsUpdating(false);
  };

  const handleAddNew = () => {
    setDialogDisplacement(null);
    setDialogOpen(true);
    setIsEditing(false);
  };

  const handleEdit = (displacement: Displacement) => {
    setDialogDisplacement(displacement);
    setDialogOpen(true);
    setIsEditing(true);
  };

  const handleSave = async (displacement: Displacement) => {
    setDialogOpen(false);

    try {
      if (displacement.id) {
        await updateDisplacement(displacement);
        setSnackbarMessage(`O deslocamento foi encerrado com sucesso!`);
      } else {
        await newDisplacement(displacement);
        setSnackbarMessage(`O deslocamento foi iniciado com sucesso!`);
      }
      setSnackbarOpen(true);
      fetchAll();
    } catch (error) {
      setSnackbarMessage(`Erro ao salvar deslocamento.`);
      setSnackbarOpen(true);
      fetchAll();
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
    if (!searchTerm) {
      return displacements.sort((a, b) => b.id - a.id);
    }

    const filtered = displacements.filter((displacement) =>
      Object.values(displacement).some(
        (value) =>
          value &&
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
        setSnackbarMessage(`O deslocamento foi excluído com sucesso!`);
        setSnackbarOpen(true);
        fetchAll();
      } else {
        setSnackbarMessage(`Erro ao deletar deslocamento.`);
        setSnackbarOpen(true);
        fetchAll();
      }
    } catch {
      setSnackbarMessage(`Erro ao deletar deslocamento.`);
      setSnackbarOpen(true);
      fetchAll();
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
        <div className="title-bar">
          <Typography variant="h6">Deslocamentos</Typography>
          <div className="search-bar">
            <IconButton
              className="buttonNew"
              aria-label="add"
              color="primary"
              onClick={handleAddNew}
            >
              <PlayCircleFilledIcon />
              <Typography>Iniciar Deslocamentos</Typography>
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
          </div>
        </div>
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
                <NotesIcon fontSize="small" className="icon" />
                <strong>Motivo</strong>
              </TableCell>
              <TableCell>
                <StartIcon fontSize="small" className="icon" />
                <strong>Início</strong>
              </TableCell>
              {!isMobile && (
                <TableCell>
                  <DoneAllIcon fontSize="small" className="icon" />
                  <strong>Fim</strong>
                </TableCell>
              )}

              {!isMobile && (
                <TableCell>
                  <FormatAlignJustifyIcon fontSize="small" className="icon" />
                  <strong>Observação</strong>
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
              Tem certeza que deseja excluir o deslocamento?
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
            {dialogDisplacement?.id
              ? "Encerrar Deslocamento"
              : "Iniciar Deslocamento"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Preencha os campos abaixo:</DialogContentText>
            {formFieldsDisplacement.map((field) => {
              const isEditingExistingDisplacement =
                dialogDisplacement && dialogDisplacement.id;
              const isNumeroDocumentoField = field.id === "numeroDocumento";
              const shouldRenderField =
                (!isEditingExistingDisplacement || !isNumeroDocumentoField) &&
                (!isEditing ||
                  (isEditing &&
                    field.id !== "idVeiculo" &&
                    field.id !== "idCliente"));

              if (shouldRenderField) {
                if (isEditing) {
                  if (
                    field.id === "kmFinal" ||
                    field.id === "fimDeslocamento" ||
                    field.id === "observacao"
                  ) {
                    return (
                      <TextField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type ? field.type : "text"}
                        fullWidth
                        margin="normal"
                        value={dialogDisplacement?.[field.id] ?? ""}
                        onChange={(e) =>
                          setDialogDisplacement((prevState: any) => ({
                            ...prevState,
                            [field.id]: e.target.value,
                          }))
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    );
                  }
                } else {
                  if (
                    field.id === "kmInicial" ||
                    field.id === "inicioDeslocamento" ||
                    field.id === "checkList" ||
                    field.id === "motivo" ||
                    field.id === "observacao"
                  ) {
                    return (
                      <TextField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type ? field.type : "text"}
                        fullWidth
                        margin="normal"
                        value={dialogDisplacement?.[field.id] ?? ""}
                        onChange={(e) =>
                          setDialogDisplacement((prevState: any) => ({
                            ...prevState,
                            [field.id]: e.target.value,
                          }))
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    );
                  }
                }
              }
              return null;
            })}

            {isEditing ? null : (
              <>
                <TextField
                  key="idCondutor"
                  select
                  label="Condutor"
                  onChange={(e) =>
                    setDialogDisplacement((prevState: any) => ({
                      ...prevState,
                      [formFieldsDisplacement[7].id]: e.target.value,
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

                <TextField
                  key="idVeiculo"
                  select
                  label="Veículo"
                  onChange={(e) =>
                    setDialogDisplacement((prevState: any) => ({
                      ...prevState,
                      [formFieldsDisplacement[8].id]: e.target.value,
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

                <TextField
                  key="idCliente"
                  select
                  label="Cliente"
                  onChange={(e) =>
                    setDialogDisplacement((prevState: any) => ({
                      ...prevState,
                      [formFieldsDisplacement[9].id]: e.target.value,
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
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => handleSave(dialogDisplacement)}>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </TableContainer>
    </Container>
  );
}
