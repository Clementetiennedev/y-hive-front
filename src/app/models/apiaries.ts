export interface Ruche {
  id: number;
  nom: string;
}

export interface Rucher {
  id: number;
  nom: string;
  ruches: Ruche[];
}
