import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./styles.module.scss";
import { Autocomplete } from "@mui/material";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formFields = [
    { id: "numeroDocumento", label: "Número do Documento" },
    { id: "tipoDocumento", label: "Tipo do Documento" },
    { id: "nome", label: "Nome" },
    { id: "logradouro", label: "Logradouro" },
    { id: "numero", label: "Número" },
    { id: "bairro", label: "Bairro" },
    { id: "cidade", label: "Cidade" },
    { id: "uf", label: "UF" },
  ];

  const documentoOptions = [
    "RG",
    "CPF",
    "CNH",
    "Passaporte",
    "Carteira de Trabalho",
  ];

  return (
    <div>
      <Button
        className={styles.buttonNewClient}
        variant="outlined"
        onClick={handleClickOpen}
      >
        
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novo Cliente</DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.spanDialog}>
            Preencha os campos abaixo para cadastrar um novo cliente.
          </DialogContentText>
          {formFields.map((field) => {
            if (field.id === "tipoDocumento") {
              return (
                <Autocomplete
                  key={field.id}
                  id={field.id}
                  options={documentoOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={field.label}
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              );
            }
            return (
              <TextField
                key={field.id}
                id={field.id}
                label={field.label}
                fullWidth
                margin="normal"
              />
            );
          })}
          {/* <TextField id="nome" label="Nome" variant="outlined" fullWidth/> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cacelar</Button>
          <Button onClick={handleClose}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
