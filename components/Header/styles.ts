import { Typography } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.header`
  .appBar {
    background-color: #1976D2;
  }

  .logo {
    font-weight: bold;
    flex-grow: 1;
  }
`;

export const StyledLink = styled(Typography)`
  display: flex;
  align-items: center;
  margin-right: 20px;

  svg {
    margin-right: 5px;
  }
`;

export const DrawerPaper = styled.div`
  background-color: #1976D2;
  color: #f2f2f2;
`;

export const RightLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
