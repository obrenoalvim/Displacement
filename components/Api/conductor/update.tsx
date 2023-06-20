import { environment } from "@/environments/environments";
import { Conductor } from "../../../types";

export default async function updateConductor(conductor: Conductor) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.stringify({
    id: conductor.id,
    nome: conductor.nome,
    numeroHabilitacao: conductor.numeroHabilitacao,
    categoriaHabilitacao: conductor.catergoriaHabilitacao,
    vencimentoHabilitacao: conductor.vencimentoHabilitacao,
  });

  try {
    const response = await fetch(
      `${environment.BASE_URL}Condutor/${conductor.id}`,
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
