import styled from "styled-components";

export const Container = styled.header`
  .tableVehicle {
    margin-top: 20px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 150px;
  }

  .tableVehicle .buttonNew {
    border: 1px solid #3f51b5;
    border-radius: 5px;
    margin: 15px;
  }

  .tableVehicle .MuiButton-containedPrimary {
    background-color: #3f51b5;
    color: #fff;
  }

  .tableVehicle .MuiButton-containedPrimary:hover {
    background-color: #303f9f;
  }

  .tableVehicle .MuiTableCell-head {
    font-weight: bold;
  }

  .tableVehicle .MuiTableRow-root.Mui-selected,
  .tableVehicle .MuiTableRow-root.Mui-selected:hover {
    background-color: #e8eaf6;
  }

  @media (max-width: 768px) {
    .tableVehicle {
      width: 100%;
    }

    .tableVehicle .MuiTableContainer-root {
      overflow-x: auto;
    }
  }
`;
