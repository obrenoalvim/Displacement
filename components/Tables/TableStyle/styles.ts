import styled from "styled-components";

export const Container = styled.main`
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

  .table .MuiTableCell-head svg {
    width: 18px;
    padding-top: 5px;
    border: 1px soldi red;
  }

  .table .MuiTableRow-root.Mui-selected,
  .table .MuiTableRow-root.Mui-selected:hover {
    background-color: #e8eaf6;
  }

  .table .title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-bottom: 15px; */
    margin-left: 15px;
    flex-wrap: wrap;
  }

  .table .title-bar h6 {
    margin: 0;
  }

  .table .search-bar {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .table .MuiTextField-root {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    .table {
      width: 100%;
    }

    .table .title-bar h6 {
    }

    .table .MuiTableContainer-root {
      overflow-x: auto;
    }
  }
`;
