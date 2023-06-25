import { environment } from "@/environments/environments";

export default async function deleteClient(id: number) {
  var body = JSON.stringify({
    id: id,
  });

  const response = await fetch(`${environment.BASE_URL}Cliente/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  return response.status == 400 ? false : true;
}
