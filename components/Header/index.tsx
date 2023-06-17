import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={styles.logo}>
          APPNATY
        </Typography>
        <nav>
          <Link href="/cliente" className={styles.link}>
            Cliente
          </Link>
          <Link href="/condutor" className={styles.link}>
            Condutor
          </Link>
          <Link href="/deslocamento" className={styles.link}>
            Deslocamento
          </Link>
          <Link href="/veiculo" className={styles.link}>
            Veículo
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};


