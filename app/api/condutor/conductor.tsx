import { environment } from "@/environments/environments";

export default async function getConductor(id: number) {
  const response = await fetch(`${environment.BASE_URL}Condutor/${id}`);
  const responseJson = await response.json();
  return responseJson;
}
