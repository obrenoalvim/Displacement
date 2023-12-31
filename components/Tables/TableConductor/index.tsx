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
} from "@mui/material";
import Row from "./Row";
import { Conductor } from "@/types";
import { useMediaQuery } from "react-responsive";
import { Container } from "../TableStyle/styles";
import DialogError from "../../Utils/Dialog/Error/page";
import DialogLoading from "../../Utils/Dialog/Loading/page";
import { formFieldsConductor } from "../../Form/FormFields/conductor";

// Icons
import AddIcon from "@mui/icons-material/Add";
import ClassIcon from "@mui/icons-material/Class";
import BadgeIcon from "@mui/icons-material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import HowToRegIcon from "@mui/icons-material/HowToReg";

// Functions
import newConductor from "../../Api/conductor/add";
import getAllConductors from "../../Api/conductor";
import deleteConductor from "../../Api/conductor/delete";
import updateConductor from "../../Api/conductor/update";

export default function CollapsibleTable() {
  const [page, setPage] = useState(0);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [conductors, setConductors] = useState<Conductor[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConductorId, setDeleteConductorId] = useState<number>(0);
  const [dialogConductor, setDialogConductor] = useState<any | null>(null);
  const [deleteConductorName, setDeleteConductorName] = useState<string>("");

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getAllConductors();
      setConductors(data);
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
    setDialogConductor(null);
    setDialogOpen(true);
  };

  const handleEdit = (conductor: Conductor) => {
    setDialogConductor(conductor);
    setDialogOpen(true);
  };

  const handleSave = async (conductor: Conductor) => {
    setDialogOpen(false);

    try {
      if (conductor.id) {
        await updateConductor(conductor);
        setSnackbarMessage(
          `O condutor ${conductor.nome} foi atualizado com sucesso!`
        );
      } else {
        await newConductor(conductor);
        setSnackbarMessage(
          `O condutor ${conductor.nome} foi cadastrado com sucesso!`
        );
      }
      setSnackbarOpen(true);
      fetchData();
    } catch (error) {
      setSnackbarMessage(`Erro ao salvar condutor.`);
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

  const filterConductors = () => {
    const filtered = conductors.filter((conductor) =>
      Object.values(conductor).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return filtered.sort((a, b) => b.id - a.id);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async (id: number, nome: string) => {
    setDeleteConductorId(id);
    setDeleteConductorName(nome);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteDialogOpen(false);

    try {
      const response = await deleteConductor(deleteConductorId);
      if (response) {
        setSnackbarMessage(
          `O condutor ${deleteConductorName} foi excluído com sucesso!`
        );
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarMessage(`Erro ao deletar condutor ${deleteConductorName}.`);
        setSnackbarOpen(true);
        fetchData();
      }
    } catch {
      setSnackbarMessage(`Erro ao deletar condutor ${deleteConductorName}.`);
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

  const filteredConductors = filterConductors();
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredConductors.length - page * rowsPerPage);

  return (
    <Container>
      <TableContainer className="table" component={Paper}>
        <div className="title-bar">
          <Typography variant="h6">Condutores</Typography>
          <div className="search-bar">
            <IconButton
              className="buttonNew"
              aria-label="add"
              color="primary"
              onClick={handleAddNew}
            >
              <AddIcon />
              <Typography>Novo Condutor</Typography>
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
                <BadgeIcon fontSize="small" className="icon" />
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <ClassIcon fontSize="small" className="icon" />
                <strong>Categoria</strong>
              </TableCell>

              {!isMobile && (
                <TableCell>
                  <HowToRegIcon fontSize="small" className="icon" />
                  <strong>Nº Habilitação</strong>
                </TableCell>
              )}

              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConductors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((conductor) => (
                <Row
                  key={conductor.id}
                  row={conductor}
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
          count={filteredConductors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirmação de exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir o condutor {deleteConductorName}?
              Qualquer deslocamento associado a ele também será excluído.
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
            {dialogConductor?.id ? "Editar Condutor" : "Novo Condutor"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Preencha os campos abaixo:</DialogContentText>
            {formFieldsConductor.map((field) => {
              const isEditingExistingConductor =
                dialogConductor && dialogConductor.id;
              const isNumeroDocumentoField = field.id === "numeroDocumento";
              const shouldRenderField =
                !isEditingExistingConductor || !isNumeroDocumentoField;
              if (shouldRenderField) {
                return (
                  <TextField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    type={field.type ? field.type : "text"}
                    fullWidth
                    margin="normal"
                    value={dialogConductor?.[field.id] ?? ""}
                    onChange={(e) =>
                      setDialogConductor((prevState: any) => ({
                        ...prevState,
                        [field.id]: e.target.value,
                      }))
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                );
              }
              return null;
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => handleSave(dialogConductor)}>Salvar</Button>
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
