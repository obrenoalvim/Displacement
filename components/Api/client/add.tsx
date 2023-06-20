import { environment } from "@/environments/environments";
import { Cliente } from "@/types";
export default async function newClient(
  cliente: Cliente
) {
  const body = {
    "numeroDocumento": cliente.numeroDocumento,
    "tipoDocumento": cliente.tipoDocumento,
    "nome": cliente.nome,
    "logradouro": cliente.logradouro,
    "numero": cliente.numero,
    "bairro": cliente.bairro,
    "cidade": cliente.cidade,
    "uf": cliente.uf,
  };

  const response = await fetch(
    `${environment.BASE_URL}Cliente`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const responseJson = await response.json();

  return responseJson;
}
