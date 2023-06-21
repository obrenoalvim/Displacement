import styled from "styled-components";
import { Badge, Card } from "@mui/material";

export const StyledCard = styled(Card)`
  position: relative;
  width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 15px;
`;

export const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledBadge = styled(Badge)`
  position: absolute;
  top: 8px;
  right: 8px;
`;
