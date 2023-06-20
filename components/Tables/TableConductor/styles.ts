import styled from 'styled-components';

export const Container = styled.main`
  .tableConductor {
    margin-top: 20px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 150px;
  }
  
  .tableConductor .buttonNew {
    border: 1px solid #3f51b5;
    border-radius: 5px;
    margin: 15px;
  }
  
  .tableConductor .MuiButton-containedPrimary {
    background-color: #3f51b5;
    color: #fff;
  }
  
  .tableConductor .MuiButton-containedPrimary:hover {
    background-color: #303f9f;
  }
  
  .tableConductor .MuiTableCell-head {
    font-weight: bold;
  }
  
  .tableConductor .MuiTableRow-root.Mui-selected,
  .tableConductor .MuiTableRow-root.Mui-selected:hover {
    background-color: #e8eaf6;
  }
  
  @media (max-width: 768px) {
    .tableConductor {
      width: 100%;
    }
  
    .tableConductor .MuiTableContainer-root {
      overflow-x: auto;
    }
  }
`;
