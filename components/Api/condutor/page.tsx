import { environment } from "@/environments/environments";

export default async function getAllConductors() {
  const response = await fetch(`${environment.BASE_URL}Condutor`);
  const responseJson = await response.json();
  return responseJson;
}
