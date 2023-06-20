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
import getAllClients from "../Api/client";
import deleteClient from "../Api/client/delete";
import newClient from "../Api/client/add";
import updateClient from "../Api/client/update";
import { Cliente } from "@/types";
import DialogLoading from "../Utils/Dialog/Loading/page";
import DialogError from "../Utils/Dialog/Error/page";
import { useMediaQuery } from "react-responsive";
import { Container } from "./styles";
import Row from "./Row";
import { formFieldsClient } from "../Form/FormFields/client";

export default function CollapsibleTable() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState<number>(0);
  const [deleteClientName, setDeleteClientName] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogCliente, setDialogCliente] = useState<any | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getAllClients();
      setClientes(data);
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
    setDialogCliente(null);
    setDialogOpen(true);
  };

  const handleEdit = (cliente: Cliente) => {
    setDialogCliente(cliente);
    setDialogOpen(true);
  };

  const handleSave = async (cliente: Cliente) => {
    setDialogOpen(false);

    try {
      if (cliente.id) {
        await updateClient(cliente);
        setSnackbarMessage(
          `O cliente ${cliente.nome} foi atualizado com sucesso!`
        );
      } else {
        await newClient(cliente);
        setSnackbarMessage(
          `O cliente ${cliente.nome} foi cadastrado com sucesso!`
        );
      }
      setSnackbarOpen(true);
      fetchData();
    } catch (error) {
      setSnackbarMessage(`Erro ao salvar cliente.`);
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

  const filterClientes = () => {
    const filtered = clientes.filter((cliente) =>
      Object.values(cliente).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return filtered.sort((a, b) => b.id - a.id);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async (id: number, nome: string) => {
    setDeleteClientId(id);
    setDeleteClientName(nome);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteDialogOpen(false);

    try {
      const response = await deleteClient(deleteClientId);
      if (response) {
        setSnackbarMessage(
          `O usuário ${deleteClientName} foi excluído com sucesso!`
        );
        setSnackbarOpen(true);
        fetchData();
      } else {
        setSnackbarMessage(`Erro ao deletar usuário ${deleteClientName}.`);
        setSnackbarOpen(true);
        fetchData();
      }
    } catch {
      setSnackbarMessage(`Erro ao deletar usuário ${deleteClientName}.`);
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

  const filteredClientes = filterClientes();
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredClientes.length - page * rowsPerPage);

  return (
    <Container>
      <TableContainer className="tableClient" component={Paper}>
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
            <Typography variant="h6">Clientes</Typography>
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
                <Typography>Novo Cliente</Typography>
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
                <strong>Cidade</strong>
              </TableCell>

              {!isMobile && (
                <TableCell>
                  <strong>Uf</strong>
                </TableCell>
              )}

              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cliente) => (
                <Row
                  key={cliente.id}
                  row={cliente}
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
          count={filteredClientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirmação de exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir o cliente {deleteClientName}?
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
            {dialogCliente ? "Editar cliente" : "Novo cliente"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Preencha os campos abaixo:</DialogContentText>
            {formFieldsClient.map((field) => {
              const isEditingExistingClient = dialogCliente && dialogCliente.id;
              const isNumeroDocumentoField = field.id === "numeroDocumento";
              const shouldRenderField =
                !isEditingExistingClient || !isNumeroDocumentoField;
              if (shouldRenderField) {
                return (
                  <TextField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    fullWidth
                    margin="normal"
                    value={dialogCliente?.[field.id] ?? ""}
                    onChange={(e) =>
                      setDialogCliente((prevState: any) => ({
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
            <Button onClick={() => handleSave(dialogCliente)}>Salvar</Button>
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
