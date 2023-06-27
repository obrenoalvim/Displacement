import { environment } from "@/environments/environments";
import { Displacement } from "@/types";
export default async function newConductor(displacement: Displacement) {
  const body = {
    kmInicial: displacement.kmInicial,
    inicioDeslocamento: displacement.inicioDeslocamento,
    checkList: displacement.checkList,
    motivo: displacement.motivo,
    observacao: displacement.observacao,
    idCondutor: displacement.idCondutor,
    idVeiculo: displacement.idVeiculo,
    idCliente: displacement.idCliente,
  };

  const response = await fetch(
    `${environment.BASE_URL}Deslocamento/IniciarDeslocamento`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const responseJson = await response.json();

  console.log(responseJson);

  return responseJson;
}
