"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LocationOnIcon from "@mui/icons-material/LocationOn";


import { Container, StyledLink, RightLinks } from "./styles";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderLinks = () => {
    if (isMobile) {
      return (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
      );
    }

    return (
      <RightLinks>
        <Link href="/cliente">
          <StyledLink variant="button" color="inherit">
            <PersonIcon fontSize="small" />
            Cliente
          </StyledLink>
        </Link>
        <Link href="/condutor">
          <StyledLink variant="button" color="inherit">
            <PersonIcon fontSize="small" />
            Condutor
          </StyledLink>
        </Link>
        <Link href="/veiculo">
          <StyledLink variant="button" color="inherit">
            <DriveEtaIcon fontSize="small" />
            Veículo
          </StyledLink>
        </Link>
        <Link href="/deslocamento">
          <StyledLink variant="button" color="inherit">
            <LocationOnIcon fontSize="small" />
            Deslocamento
          </StyledLink>
        </Link>
      </RightLinks>
    );
  };

  return (
    <Container>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Link href="/">
            <Image 
            src="/logo-white-removebg.png" 
            width={50}
            height={50}
            alt="Picture of the author"/>
            {/* <Typography variant="h6" className="logo">
              <StyledLink color="inherit">
                APPNATY
              </StyledLink>
            </Typography> */}
          </Link>
          <div style={{ flex: 1 }} /> {/* Espaço flexível */}
          {renderLinks()}
          <Drawer anchor="right" open={isMenuOpen} onClose={toggleMenu}>
            <List>
              <Link href="/cliente">
                <ListItem button component="a" onClick={toggleMenu}>
                  <PersonIcon fontSize="small" />
                  <ListItemText primary="Cliente" />
                </ListItem>
              </Link>
              <Link href="/condutor">
                <ListItem button component="a" onClick={toggleMenu}>
                  <PersonIcon fontSize="small" />
                  <ListItemText primary="Condutor" />
                </ListItem>
              </Link>
              <Link href="/veiculo">
                <ListItem button component="a" onClick={toggleMenu}>
                  <DriveEtaIcon fontSize="small" />
                  <ListItemText primary="Veículo" />
                </ListItem>
              </Link>
              <Link href="/deslocamento">
                <ListItem button component="a" onClick={toggleMenu}>
                  <LocationOnIcon fontSize="small" />
                  <ListItemText primary="Deslocamento" />
                </ListItem>
              </Link>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
