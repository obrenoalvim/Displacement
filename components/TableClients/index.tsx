import React, { useState, useEffect } from "react";
import {
  Box,
  Collapse,
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./styles.module.scss";
import getAllClients from "@/app/api/cliente/page";
import deleteClient from "../../app/api/cliente/delete";
import { Cliente } from "@/types";
import getClient from "@/app/api/cliente/client";

interface Props {
  row: Cliente;
  onDelete: (id: number, nome: string) => void;
}

function Row(props: Props) {
  const { row, onDelete } = props;
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(row.id, row.nome);
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>{row.nome}</TableCell>
        <TableCell>{row.cidade}</TableCell>
        <TableCell>{row.uf}</TableCell>

        <TableCell>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Mais informações
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nº Doc.</TableCell>
                    <TableCell>Logradouro</TableCell>
                    <TableCell>Bairro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.numeroDocumento}</TableCell>
                    <TableCell>{row.logradouro}</TableCell>
                    <TableCell>{row.bairro}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

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

  const applySearchFilter = () => {
    const filteredClientes = filterClientes();
    const totalRows = filteredClientes.length;
    const lastPage = Math.max(0, Math.ceil(totalRows / rowsPerPage) - 1);
    const newPage = Math.min(page, lastPage);
    setPage(newPage);
  };

  const verifyClient = async (id: number) => {
    const response = await getClient(id);
    const responseJson = await response.json();

    return responseJson ? true : false;
  };

  const handleDelete = async (id: number, nome: string) => {
    setDeleteClientId(id);
    setDeleteClientName(nome);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    setDeleteDialogOpen(false);

    try {
      await deleteClient(deleteClientId);
      setSnackbarMessage(
        `O usuário ${deleteClientName} foi excluído com sucesso!`
      );
      setSnackbarOpen(true);
      fetchData();
    } catch (error) {
      try {
        verifyClient(deleteClientId);
        setSnackbarMessage(
          `O usuário ${deleteClientName} foi excluído com sucesso!`
        );
        setSnackbarOpen(true);
        fetchData();
      } catch (error) {
        setSnackbarMessage(`Erro ao deletar usuário ${deleteClientName}.`);
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const filteredClientes = filterClientes();
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredClientes.length - page * rowsPerPage);

  return (
    <TableContainer className={styles.tableClient} component={Paper}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        style={{ marginTop: "20px", paddingRight: "15px", paddingLeft: "15px" }}
      >
        <Grid item>
          <Typography variant="h6">Clientes</Typography>
        </Grid>
        <Grid item sx={{ marginLeft: "auto" }}>
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
            <TableCell>
              <strong>UF</strong>
            </TableCell>
            <TableCell>
              <strong>Ações</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredClientes
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((cliente) => (
              <Row key={cliente.id} row={cliente} onDelete={handleDelete} />
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
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja realmente excluir o cliente {deleteClientName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        ContentProps={{
          sx: { backgroundColor: "#43a047" },
        }}
      />
    </TableContainer>
  );
}
