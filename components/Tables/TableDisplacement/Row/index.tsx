import { Displacement } from "@/types";
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
import { useMediaQuery } from "react-responsive";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";

interface Props {
  row: Displacement;
  onDelete: (id: number, nome: string) => void;
  onEdit: (displacement: Displacement) => void;
}

export default function Row(props: Props) {
  const { row, onDelete, onEdit } = props;
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleDelete = () => {
    onDelete(row.id, row.motivo);
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

        <TableCell>{row.motivo}</TableCell>
        <TableCell>{row.kmInicial}</TableCell>

        {!isMobile && <TableCell>{row.idCliente}</TableCell>}

        <TableCell>
          <IconButton aria-label="edit" onClick={handleEdit}>
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
                    <TableCell>Vencimento Habilitação</TableCell>
                    {isMobile && <TableCell>Nº Habilitação</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.checkList}</TableCell>
                    {isMobile && <TableCell>{row.observacao}</TableCell>}
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