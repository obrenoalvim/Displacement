import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, CardContent, Typography } from "@mui/material";
import { CardGrid, StyledCard, StyledBadge } from "./styles";
import Link from "next/link";
import getAllClients from "../Api/client";
import getAllVehicles from "../Api/vehicle";
import getAllConductors from "../Api/conductor";
import getAllDisplacements from "../Api/displacement";

export default function Homepage() {
  const [clientCount, setClientCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [conductorCount, setConductorCount] = useState(0);
  const [displacementCount, setDisplacementCount] = useState(0);

  useEffect(() => {
    const fetchClientCount = async () => {
      try {
        const clients = await getAllClients();
        setClientCount(clients.length);
      } catch (error) {
        console.error("Erro ao obter a quantidade de clientes:", error);
      }
    };

    const fetchVehicleCount = async () => {
      try {
        const vehicles = await getAllVehicles();
        setVehicleCount(vehicles.length);
      } catch (error) {
        console.error("Erro ao obter a quantidade de veículos:", error);
      }
    };

    const fetchConductorCount = async () => {
      try {
        const conductors = await getAllConductors();
        setConductorCount(conductors.length);
      } catch (error) {
        console.error("Erro ao obter a quantidade de condutores:", error);
      }
    };

    const fetchDisplacementCount = async () => {
      try {
        const displacements = await getAllDisplacements();
        setDisplacementCount(displacements.length);
      } catch (error) {
        console.error("Erro ao obter a quantidade de deslocamentos:", error);
      }
    };

    fetchClientCount();
    fetchVehicleCount();
    fetchConductorCount();
    fetchDisplacementCount();

    const interval = setInterval(() => {
      fetchClientCount();
      fetchVehicleCount();
      fetchConductorCount();
      fetchDisplacementCount();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: "Clientes", url: "/cliente", badgeContent: clientCount },
    { title: "Veículos", url: "/veiculo", badgeContent: vehicleCount },
    { title: "Condutores", url: "/condutor", badgeContent: conductorCount },
    { title: "Deslocamento", url: "/deslocamento", badgeContent: displacementCount },
  ];

  return (
    <CardGrid>
      {cards.map((card, index) => (
        <Link href={card.url} key={index}>
          <StyledCard>
            {card.badgeContent > 0 && (
              <StyledBadge badgeContent={card.badgeContent} color="secondary" />
            )}
            <CardContent>
              <Typography variant="h5" component="div" align="center">
                {card.title}
              </Typography>
            </CardContent>
          </StyledCard>
        </Link>
      ))}
    </CardGrid>
  );
}
