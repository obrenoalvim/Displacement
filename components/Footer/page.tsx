import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from './styles.module.scss'

export default function Footer() {
  return (
    <AppBar position="fixed" className={styles.footer}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="body1" className={styles.text}>
          Feito por <strong>Breno Alvim</strong>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
