import { environment } from "@/environments/environments";
import { useIsFocusVisible } from "@mui/material";

export default async function newClient(
  numeroDocumento: string,
  tipoDocumento: string,
  nome: string,
  logradouro: string,
  numero: string,
  bairro: string,
  cidade: string,
  uf: string
) {
  const body = {
    numeroDocumento: numeroDocumento,
    tipoDocumento: tipoDocumento,
    nome: nome,
    logradouro: logradouro,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    uf: uf,
  };

  const response = await fetch(
    "https://api-deslocamento.herokuapp.com/api/v1/Cliente",
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
