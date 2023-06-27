import { environment } from "@/environments/environments";
import { Conductor } from "@/types";

export default async function getConductor(id: number) {
  const response = await fetch(`${environment.BASE_URL}Condutor/${id}`);
  const responseJson: Conductor = await response.json();
  return responseJson;
}
