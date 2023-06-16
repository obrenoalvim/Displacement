import { environment } from "@/environments/environments";

export default async function deleteClient(id: number) {
  const body = JSON.stringify({ id: id });
  const response = await fetch(`${environment.BASE_URL}CLiente/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const responseJson = await response.json();

  return responseJson;
}
