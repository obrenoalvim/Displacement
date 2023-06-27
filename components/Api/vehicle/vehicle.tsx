import { environment } from "@/environments/environments";
import { Vehicle } from "@/types";

export default async function getVehicle(id: number) {
  const response = await fetch(`${environment.BASE_URL}Veiculo/${id}`);
  const responseJson: Vehicle = await response.json();
  return responseJson;
}
