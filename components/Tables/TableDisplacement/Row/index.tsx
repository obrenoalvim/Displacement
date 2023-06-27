import { useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Collapse,
  Dialog,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Displacement, Client, Vehicle, Conductor } from "@/types";
import getConductor from "../../../Api/conductor/conductor";
import getClient from "../../../Api/client/client";
import getVehicle from "../../../Api/vehicle/vehicle";

interface Props {
  row: Displacement;
  onDelete: (id: number, nome: string) => void;
  onEdit: (displacement: Displacement) => void;
}

export default function Row(props: Props) {
  const { row, onDelete, onEdit } = props;
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<{
    type: "conductor" | "client" | "vehicle" | "";
    data: Conductor | Client | Vehicle | null;
  }>({
    type: "",
    data: null,
  });

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleDelete = () => {
    onDelete(row.id, row.motivo);
  };

  const handleEdit = () => {
    onEdit(row);
  };

  const handleUserDetails = async (
    id: number,
    type: "conductor" | "client" | "vehicle"
  ) => {
    let entityData = null;

    switch (type) {
      case "conductor":
        entityData = await getConductor(id);
        break;
      case "client":
        entityData = await getClient(id);
        break;
      case "vehicle":
        entityData = await getVehicle(id);
        break;
      default:
        break;
    }

    setSelectedEntity({
      type,
      data: entityData,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedEntity({
      type: "",
      data: null,
    });
    setDialogOpen(false);
  };

  const renderEntityDialogContent = () => {
    if (!selectedEntity.data) {
      return <Typography>Não encontrado ou excluído</Typography>;
    }

    switch (selectedEntity.type) {
      case "conductor":
        return (
          <>
            <Typography variant="h6" style={{ marginBottom: "5px" }}>
              Detalhes do Condutor:
            </Typography>
            <Typography>
              <strong>Nome:</strong> {(selectedEntity.data as Conductor).nome}
            </Typography>
            <Typography>
              <strong>Nº Habilitação:</strong>{" "}
              {(selectedEntity.data as Conductor).numeroHabilitacao}
            </Typography>
            <Typography>
              <strong>Categoria:</strong>{" "}
              {(selectedEntity.data as Conductor).catergoriaHabilitacao}
            </Typography>
            <Typography>
              <strong>Vencimento:</strong>{" "}
              {format(
                new Date(
                  (selectedEntity.data as Conductor).vencimentoHabilitacao
                ),
                "dd/MM/yyyy"
              )}
            </Typography>
          </>
        );
      case "client":
        return (
          <>
            <Typography variant="h6" style={{ marginBottom: "5px" }}>
              Detalhes do Cliente:
            </Typography>
            <Typography>
              <strong>Nome: </strong>
              {(selectedEntity.data as Client).nome}
            </Typography>
            <Typography>
              <strong>Logradouro: </strong>
              {(selectedEntity.data as Client).logradouro}
            </Typography>
            <Typography>
              <strong>Número: </strong>
              {(selectedEntity.data as Client).numero}
            </Typography>
            <Typography>
              <strong>Bairro: </strong>
              {(selectedEntity.data as Client).bairro}
            </Typography>
            <Typography>
              <strong>Cidade: </strong>
              {(selectedEntity.data as Client).cidade}
            </Typography>
            <Typography>
              <strong>Uf: </strong>
              {(selectedEntity.data as Client).uf}
            </Typography>
            <Typography>
              <strong>Nº Documento: </strong>
              {(selectedEntity.data as Client).numeroDocumento}
            </Typography>
            <Typography>
              <strong>Tipo Documento: </strong>
              {(selectedEntity.data as Client).tipoDocumento}
            </Typography>
          </>
        );
      case "vehicle":
        return (
          <>
            <Typography variant="h6" style={{ marginBottom: "5px" }}>
              Detalhes do Veículo:
            </Typography>
            <Typography>
              <strong>Placa: </strong>
              {(selectedEntity.data as Vehicle).placa}
            </Typography>
            <Typography>
              <strong>Marca/Modelo: </strong>
              {(selectedEntity.data as Vehicle).marcaModelo}
            </Typography>
            <Typography>
              <strong>Ano Fabricação: </strong>
              {(selectedEntity.data as Vehicle).anoFabricacao}
            </Typography>
            <Typography>
              <strong>Km Atual: </strong>
              {(selectedEntity.data as Vehicle).kmAtual}
            </Typography>
          </>
        );
      default:
        return null;
    }
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

        <TableCell>{row.motivo}</TableCell>
        <TableCell>
          {format(new Date(row.inicioDeslocamento), "dd/MM/yyyy")}
        </TableCell>

        {!isMobile && (
          <TableCell>
            {row.fimDeslocamento == null
              ? "Não encerrado"
              : format(new Date(row.fimDeslocamento), "dd/MM/yyyy")}
          </TableCell>
        )}

        {!isMobile && <TableCell>{row.observacao}</TableCell>}

        <TableCell>
          {row.fimDeslocamento != null ? null : (
            <IconButton
              aria-label="finish"
              onClick={handleEdit}
              title="Encerrar Deslocamento"
            >
              <CheckCircleIcon style={{ color: "green" }} />
            </IconButton>
          )}
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <AccountBoxIcon fontSize="small" className="icon" />{" "}
                      Cliente
                    </TableCell>
                    <TableCell>
                      <AccountCircleIcon fontSize="small" className="icon" />{" "}
                      Condutor
                    </TableCell>
                    <TableCell>
                      <DriveEtaIcon fontSize="small" className="icon" /> Veículo
                    </TableCell>
                    <TableCell>
                      <EmojiFlagsIcon fontSize="small" className="icon" /> Km
                      Inicial
                    </TableCell>
                    <TableCell>
                      <AssistantPhotoIcon fontSize="small" className="icon" />{" "}
                      Km Final
                    </TableCell>
                    <TableCell>
                      <ChecklistIcon fontSize="small" className="icon" />{" "}
                      CheckList
                    </TableCell>
                    {isMobile && <TableCell>Nº Habilitação</TableCell>}
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        aria-label="view-client"
                        onClick={() =>
                          handleUserDetails(row.idCliente, "client")
                        }
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      Ver
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="view-conductor"
                        onClick={() =>
                          handleUserDetails(row.idCondutor, "conductor")
                        }
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      Ver
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="view-vehicle"
                        onClick={() =>
                          handleUserDetails(row.idVeiculo, "vehicle")
                        }
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      Ver
                    </TableCell>
                    <TableCell>{row.kmInicial}</TableCell>
                    <TableCell>
                      {row.kmFinal != null ? row.kmFinal : "Não encerrado"}
                    </TableCell>
                    <TableCell>{row.checkList}</TableCell>
                    {isMobile && <TableCell>{row.observacao}</TableCell>}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>{renderEntityDialogContent()}</DialogContent>
      </Dialog>
    </>
  );
}
