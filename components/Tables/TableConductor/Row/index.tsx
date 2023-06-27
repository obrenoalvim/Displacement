import { Conductor } from "@/types";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { format } from "date-fns";
import { useMediaQuery } from "react-responsive";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import RuleIcon from "@mui/icons-material/Rule";
import DeleteIcon from "@mui/icons-material/Delete";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  row: Conductor;
  onDelete: (id: number, nome: string) => void;
  onEdit: (conductor: Conductor) => void;
}

export default function Row(props: Props) {
  const { row, onDelete, onEdit } = props;
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleDelete = () => {
    onDelete(row.id, row.nome);
  };

  const handleEdit = () => {
    onEdit(row);
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
        <TableCell>{row.catergoriaHabilitacao}</TableCell>

        {!isMobile && <TableCell>{row.numeroHabilitacao}</TableCell>}

        <TableCell>
          <IconButton
            title="Editar Condutor"
            aria-label="edit"
            onClick={handleEdit}
          >
            <EditIcon style={{ color: "grey" }} />
          </IconButton>

          <IconButton
            title="Deletar Condutor"
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon style={{ color: "red" }} />
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
                    <TableCell>
                      {" "}
                      <RuleIcon fontSize="small" className="icon" /> Vencimento
                      Habilitação
                    </TableCell>
                    {isMobile && (
                      <TableCell>
                        {" "}
                        <HowToRegIcon fontSize="small" className="icon" /> Nº
                        Habilitação
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {format(
                        new Date(row.vencimentoHabilitacao),
                        "dd/MM/yyyy"
                      )}
                    </TableCell>
                    {isMobile && <TableCell>{row.numeroHabilitacao}</TableCell>}
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
