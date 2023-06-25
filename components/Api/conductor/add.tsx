import { environment } from "@/environments/environments";
import { Conductor } from "@/types";
export default async function newConductor(conductor: Conductor) {
  const body = {
    nome: conductor.nome,
    numeroHabilitacao: conductor.numeroHabilitacao,
    categoriaHabilitacao: conductor.catergoriaHabilitacao,
    vencimentoHabilitacao: conductor.vencimentoHabilitacao,
  };

  const response = await fetch(`${environment.BASE_URL}Condutor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseJson = await response.json();

  return responseJson;
}
