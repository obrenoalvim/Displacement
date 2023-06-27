import { environment } from "@/environments/environments";
import { Client } from "@/types";

export default async function getClient(id: number) {
  const response = await fetch(`${environment.BASE_URL}Cliente/${id}`);
  const responseJson: Client = await response.json();
  return responseJson;
}
