import { environment } from "@/environments/environments";
import { Client } from "@/types";
export default async function newClient(client: Client) {
  const body = {
    numeroDocumento: client.numeroDocumento,
    tipoDocumento: client.tipoDocumento,
    nome: client.nome,
    logradouro: client.logradouro,
    numero: client.numero,
    bairro: client.bairro,
    cidade: client.cidade,
    uf: client.uf,
  };

  const response = await fetch(`${environment.BASE_URL}Cliente`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseJson = await response.json();

  return responseJson;
}
