// import axios from 'axios';

export default async function getAllClients() {
  const response = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente');

  const responseJson = await response.json();

  return responseJson;
  // const response = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Cliente');
  // return response.data;
}