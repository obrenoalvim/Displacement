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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import getAllVehicles from "../../Api/vehicle";
import deleteVehicle from "../../Api/vehicle/delete";
import newVehicle from "../../Api/vehicle/add";
import updateVehicle from "../../Api/vehicle/update";
import { Vehicle } from "@/types";
import DialogLoading from "../../Utils/Dialog/Loading/page";
import DialogError from "../../Utils/Dialog/Error/page";
import { useMediaQuery } from "react-responsive";
import { Container } from "../TableStyle/styles";
import Row from "./Row";
import { formFieldsVehicle } from "../../Form/FormFields/vehicle";
import Filter1Icon from '@mui/icons-material/Filter1';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';

export default function CollapsibleTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteVehicleId, setDeleteVehicleId] = useState<number>(0);
  const [deleteVehicleName, setDeleteVehicleName] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogVehicle, setDialogVehicle] = useState<any | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getAllVehicles();
      setVehicles(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
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
    setDialogVehicle(null);
    setDialogOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setDialogVehicle(vehicle);
    setDialogOpen(true);
  };

  const handleSave = async (vehicle: Vehicle) => {
    setDialogOpen(false);

    try {
      if (vehicle.id) {
        await updateVehicle(vehicle);
        setSnackbarMessage(
          `O veículo ${vehicle.placa} foi atualizado com sucesso!`
        );
      } else {
        await newVehicle(vehicle);
        setSnackbarMessage(
          `O veículo ${vehicle.placa} foi cadastrado com sucesso!`
        );
      }
      setSnackbarOpen(true);
      fetchData();
    } catch (error) {
      setSnackbarMessage(`Erro ao salvar veículo.`);
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

  const filterVehicles = () => {
    const filtered = vehicles.filter((vehicle) =>
      Object.values(vehicle).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return filtered.sort((a, b) => b.id - a.id);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async (id: number, nome: string) => {
    setDeleteVehicleId(id);
    setDeleteVehicleName(nome);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteDialogOpen(false);

    try {
      const response = await deleteVehicle(deleteVehicleId);
      if (response) {
        setSnackbarMessage(
          `O veículo ${deleteVehicleName} foi excluído com sucesso!`
        );
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarMessage(`Erro ao deletar veículo ${deleteVehicleName}.`);
        setSnackbarOpen(true);
        fetchData();
      }
    } catch {
      setSnackbarMessage(`Erro ao deletar veículo ${deleteVehicleName}.`);
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

  const filteredVehicles = filterVehicles();
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredVehicles.length - page * rowsPerPage);

  return (
    <Container>
      <TableContainer className="table" component={Paper}>
      <div className="title-bar">
          <Typography variant="h6">Veículos</Typography>
          <div className="search-bar">
            <IconButton
              className="buttonNew"
              aria-label="add"
              color="primary"
              onClick={handleAddNew}
            >
              <AddIcon />
              <Typography>Novo Veículo</Typography>
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
                <Filter1Icon fontSize="small" className="icon"/>
                <strong>Placa</strong>
              </TableCell>
              <TableCell>
              <BrandingWatermarkIcon fontSize="small" className="icon"/>
                <strong>Marca/Modelo</strong>
              </TableCell>

              {!isMobile && (
                <TableCell>
                  <DateRangeIcon fontSize="small" className="icon"/>
                  <strong>Ano Fabricação</strong>
                </TableCell>
              )}

              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vehicle) => (
                <Row
                  key={vehicle.id}
                  row={vehicle}
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
          count={filteredVehicles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirmação de exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir o veículo {deleteVehicleName}?
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
            {dialogVehicle?.id ? "Editar veículo" : "Novo veículo"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Preencha os campos abaixo:</DialogContentText>
            {formFieldsVehicle.map((field) => {
              const isEditingExistingVehicle =
                dialogVehicle && dialogVehicle.id;
              const isNumeroDocumentoField = field.id === "numeroDocumento";
              const shouldRenderField =
                !isEditingExistingVehicle || !isNumeroDocumentoField;
              if (shouldRenderField) {
                return (
                  <TextField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    type={field.type ? field.type : "text"}
                    fullWidth
                    margin="normal"
                    value={dialogVehicle?.[field.id] ?? ""}
                    onChange={(e) =>
                      setDialogVehicle((prevState: any) => ({
                        ...prevState,
                        [field.id]: e.target.value,
                      }))
                    }
                  />
                );
              }
              return null;
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => handleSave(dialogVehicle)}>Salvar</Button>
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
