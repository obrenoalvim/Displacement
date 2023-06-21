import styled from "styled-components";

export const Container = styled.header`
  .table {
    margin-top: 20px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 150px;
  }

  .table .buttonNew {
    border: 1px solid #3f51b5;
    border-radius: 5px;
    margin: 15px;
  }

  .table .MuiButton-containedPrimary {
    background-color: #3f51b5;
    color: var(--white);
  }

  .table .MuiButton-containedPrimary:hover {
    background-color: #303f9f;
  }

  .table .MuiTableCell-head {
    font-weight: bold;
  }

  .table .MuiTableRow-root.Mui-selected,
  .table .MuiTableRow-root.Mui-selected:hover {
    background-color: #e8eaf6;
  }

  @media (max-width: 768px) {
    .table {
      width: 100%;
    }

    .table .MuiTableContainer-root {
      overflow-x: auto;
    }
  }
`;
