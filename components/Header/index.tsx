import { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import styles from '../styles/styles.module.scss';

export default function Header(){
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderLinks = () => {
    if (isMobile) {
      return (
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>
      );
    }

    return (
      <>
        <Link href="/cliente">
          <Typography variant="button" color="inherit" className={styles.link}>
            Cliente
          </Typography>
        </Link>
        <Link href="/condutor">
          <Typography variant="button" color="inherit" className={styles.link}>
            Condutor
          </Typography>
        </Link>
        <Link href="/veiculo">
          <Typography variant="button" color="inherit" className={styles.link}>
            Veículo
          </Typography>
        </Link>
        <Link href="/deslocamento">
          <Typography variant="button" color="inherit" className={styles.link}>
            Deslocamento
          </Typography>
        </Link>
      </>
    );
  };

  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar>
     
        <Typography variant="h6" className={styles.logo}>
          APPNATY
        </Typography>
     
        {renderLinks()}
        <Drawer anchor="right" open={isMenuOpen} onClose={toggleMenu}>
          <List>
            <Link href="/cliente">
              <ListItem button component="a" onClick={toggleMenu}>
                <ListItemText primary="Cliente" />
              </ListItem>
            </Link>
            <Link href="/Condutor">
              <ListItem button component="a" onClick={toggleMenu}>
                <ListItemText primary="Condutor" />
              </ListItem>
            </Link>
            <Link href="/veiculo">
              <ListItem button component="a" onClick={toggleMenu}>
                <ListItemText primary="Veículo" />
              </ListItem>
            </Link>
            <Link href="/Deslocamento">
              <ListItem button component="a" onClick={toggleMenu}>
                <ListItemText primary="Deslocamento" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
