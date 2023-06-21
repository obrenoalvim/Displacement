import { environment } from "@/environments/environments";

export default async function getAllDisplacements() {
  const response = await fetch(`${environment.BASE_URL}Deslocamento`);
  const responseJson = await response.json();
  return responseJson;

  
}
