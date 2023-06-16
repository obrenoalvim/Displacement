import { environment } from "@/environments/environments";
import getClient from "./client";

export default async function deleteClient(id: number) {
  var body = JSON.stringify({
    id: id,
  });

  console.log(body);
  const response = await fetch(`${environment.BASE_URL}Cliente/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 200) {
    const response = await getClient(id);
    const responseJson = await response.json();
    if (responseJson.lenght > 0) {
      return false;
    } else {
      return true;
    }
  }
}


