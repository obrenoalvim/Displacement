import { environment } from "@/environments/environments";
import { Client } from "../../../types";

export default async function updateClient(client: Client) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.stringify({
    id: client.id,
    nome: client.nome,
    logradouro: client.logradouro,
    numero: client.numero,
    bairro: client.bairro,
    cidade: client.cidade,
    uf: client.uf,
    tipoDocumento: client.tipoDocumento,
  });

  try {
    const response = await fetch(
      `${environment.BASE_URL}Cliente/${client.id}`,
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
