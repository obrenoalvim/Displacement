import { Box, CircularProgress, Dialog, Typography } from "@mui/material";

interface DialogErrorProps {
  error: boolean;
}

export default function DialogError(props: DialogErrorProps) {
  return (
    <Dialog open={props.error}>
      <Box display="flex" alignItems="center" justifyContent="center" p={4}>
        <Typography variant="h6">Erro ao carregar dados. Tentando novamente em 5 segundos!</Typography>
      </Box>
    </Dialog>
  );
}
