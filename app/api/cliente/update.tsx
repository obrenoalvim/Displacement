import { environment } from "@/environments/environments";
import { Cliente } from "../../../types";

export default async function updateClient(cliente: Cliente) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.stringify({
    "id": cliente.id,
    "nome": cliente.nome,
    "logradouro": cliente.logradouro,
    "numero": cliente.numero,
    "bairro": cliente.bairro,
    "cidade": cliente.cidade,
    "uf": cliente.uf,
    "tipoDocumento": cliente.tipoDocumento,
  });

  try{

    const response = await fetch(`${environment.BASE_URL}Cliente/${cliente.id}`, {
      method: "PUT",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    });
    
    const responseJson = await response.json();
    
    return responseJson;
  } catch{
return false
  }
}
