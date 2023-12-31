import { Client } from "@/types";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  row: Client;
  onDelete: (id: number, nome: string) => void;
  onEdit: (cliente: Client) => void;
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
        <TableCell>{row.cidade}</TableCell>

        {!isMobile && <TableCell>{row.uf}</TableCell>}

        <TableCell>
          <IconButton
            title="Editar Cliente"
            aria-label="edit"
            onClick={handleEdit}
          >
            <EditIcon style={{ color: "grey" }} />
          </IconButton>

          <IconButton
            title="Deletar Cliente"
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
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FolderCopyIcon fontSize="small" className="icon" />
                      Nº Doc.
                    </TableCell>
                    <TableCell>
                      <HouseIcon fontSize="small" className="icon" />
                      Logradouro
                    </TableCell>
                    <TableCell>
                      <HolidayVillageIcon fontSize="small" className="icon" />
                      Bairro / Nº
                    </TableCell>
                    {isMobile && <TableCell>UF</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.numeroDocumento}</TableCell>
                    <TableCell>{row.logradouro}</TableCell>
                    <TableCell>{`${row.bairro} (${row.numero})`}</TableCell>
                    {isMobile && <TableCell>{row.uf}</TableCell>}
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
