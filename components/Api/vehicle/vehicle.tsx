import { environment } from "@/environments/environments";

export default async function getVehicle(id: number) {
  const response = await fetch(`${environment.BASE_URL}Veiculo/${id}`);
  const responseJson = await response.json();
  return responseJson;
}
