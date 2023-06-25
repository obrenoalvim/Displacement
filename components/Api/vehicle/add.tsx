import { environment } from "@/environments/environments";
import { Vehicle } from "@/types";
export default async function newVehicle(vehicle: Vehicle) {
  const body = {
    placa: vehicle.placa,
    marcaModelo: vehicle.marcaModelo,
    anoFabricacao: vehicle.anoFabricacao,
    kmAtual: vehicle.kmAtual,
  };

  const response = await fetch(`${environment.BASE_URL}Veiculo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseJson = await response.json();

  return responseJson;
}
