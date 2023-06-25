import { environment } from "@/environments/environments";
import { Displacement } from "../../../types";

export default async function updateDisplacement(displacement: Displacement) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.stringify({
    id: displacement.id,
    kmFinal: displacement.kmFinal,
    fimDeslocamento: displacement.fimDeslocamento,
    observacao: displacement.observacao,
  });

  try {
    const response = await fetch(
      `${environment.BASE_URL}Deslocamento/${displacement.id}/EncerrarDeslocamento`,
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
