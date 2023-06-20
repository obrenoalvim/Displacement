import { environment } from "@/environments/environments";
import { Vehicle } from "../../../types";

export default async function updateVechicle(vehicle: Vehicle) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.stringify({
    id: vehicle.id,
    placa: vehicle.placa,
    marcaModelo: vehicle.marcaModelo,
    anoFabricacao: vehicle.anoFabricacao,
    kmAtual: vehicle.kmAtual,
  });

  try {
    const response = await fetch(
      `${environment.BASE_URL}Veiculo/${vehicle.id}`,
      {
        method: "PUT",
        headers: myHeaders,
        body: body,
        redirect: "follow",
      }
    );

    const responseJson = await response.json();

    return responseJson;
  } catch {
    return false;
  }
}
