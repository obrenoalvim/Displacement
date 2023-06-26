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

  .table .MuiTableCell-head .icon {
    display: inline-flex;
    align-items: center;
    margin-right: 3px;
    vertical-align: middle;
  }

  .table .MuiTableCell-head strong {
    font-size: 15px;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }

  .table .MuiTableRow-root.Mui-selected,
  .table .MuiTableRow-root.Mui-selected:hover {
    background-color: #e8eaf6;
  }

  .table .title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 15px;
    flex-wrap: wrap;
  }

  .table .title-bar h6 {
    margin: 0;
    font-weight: bold;
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

    .table .MuiTableContainer-root {
      overflow-x: auto;
    }

    .table .MuiTableCell-head .icon {
      display: none;
    }
  }
`;
