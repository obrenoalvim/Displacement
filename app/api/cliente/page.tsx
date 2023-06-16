import { environment } from "@/environments/environments";


export default async function getAllClients() {
  const response = await fetch(`${environment.BASE_URL}CLiente`);

  const responseJson = await response.json();

  return responseJson;
  // const response = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Cliente');
  // return response.data;
}