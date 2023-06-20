import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Container } from "./styles";

export default function Footer() {
  return (
    <Container>
      <AppBar position="fixed" className="footer">
        <Toolbar className="toolbar">
          <Typography variant="body1" className="text">
            Feito por <strong>Breno Alvim</strong>
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
