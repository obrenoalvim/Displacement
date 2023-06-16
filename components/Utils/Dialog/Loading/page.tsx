import { Box, CircularProgress, Dialog, Typography } from "@mui/material";

interface DialogLoadingProps {
  loading: boolean;
}

export default function DialogLoading(props: DialogLoadingProps) {
  return (
    <Dialog open={props.loading}>
      <Box display="flex" alignItems="center" justifyContent="center" p={4}>
        <CircularProgress />
        <Typography variant="h6">Carregando...</Typography>
      </Box>
    </Dialog>
  );
}
