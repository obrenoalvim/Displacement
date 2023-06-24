import { environment } from "@/environments/environments";
import { Displacement } from "../../../types";

export default async function updateDisplacement(displacement: Displacement) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.stringify({
    id: displacement.id,
    kmInicial: displacement.kmInicial,
    inicioDeslocamento: displacement.inicioDeslocamento,
    checkList: displacement.checkList,
    motivo: displacement.motivo,
    observacao: displacement.observacao,
    idCondutor: displacement.idCondutor,
    idVeiculo: displacement.idVeiculo,
    idCliente: displacement.idCliente
  });

  try {
    const response = await fetch(
      `${environment.BASE_URL}Deslocamento/${displacement.id}/EncerrarDelocamento`,
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
