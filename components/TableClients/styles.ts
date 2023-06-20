import styled from 'styled-components';

export const Container = styled.header`

.tableClient {
  margin-top: 20px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 150px;
  }
  
  .tableClient .buttonNew {
  border: 1px solid #3f51b5;
  border-radius: 5px;
  margin: 15px;
  }
  
  .tableClient .MuiButton-containedPrimary {
  background-color: #3f51b5;
  color: #fff;
  }
  
  .tableClient .MuiButton-containedPrimary:hover {
  background-color: #303f9f;
  }
  
  .tableClient .MuiTableCell-head {
  font-weight: bold;
  }
  
  .tableClient .MuiTableRow-root.Mui-selected,
  .tableClient .MuiTableRow-root.Mui-selected:hover {
  background-color: #e8eaf6;
  }
  
  @media (max-width: 768px) {
  .tableClient {
  width: 100%;
  }
  
  .tableClient .MuiTableContainer-root {
  overflow-x: auto;
  }
  }


`