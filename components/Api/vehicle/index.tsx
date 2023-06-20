import { environment } from "@/environments/environments";

export default async function getAllVehicles() {
  const response = await fetch(`${environment.BASE_URL}Veiculo`);
  const responseJson = await response.json();
  return responseJson;
}
