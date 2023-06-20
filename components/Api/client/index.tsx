import { environment } from "@/environments/environments";

export default async function getAllClients() {
  const response = await fetch(`${environment.BASE_URL}Cliente`);
  const responseJson = await response.json();
  return responseJson;

  
}
