import { environment } from "@/environments/environments";

export default async function getDisplacement(id: number) {
  const response = await fetch(`${environment.BASE_URL}Deslocamento/${id}`);
  const responseJson = await response.json();
  return responseJson;
}
