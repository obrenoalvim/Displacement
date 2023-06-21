export interface Client {
  id: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface Conductor {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface Vehicle {
  id: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface Displacement {
  id: number;
  kmInicial: number;
  inicioDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}