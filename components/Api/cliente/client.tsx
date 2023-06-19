import { environment } from "@/environments/environments";

export default async function getClient(id: number) {
  const response = await fetch(`${environment.BASE_URL}Cliente/${id}`);
  const responseJson = await response.json();
  return responseJson;
}
