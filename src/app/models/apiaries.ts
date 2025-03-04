export interface Ruche {
  id: number;
  nom: string;
}

export interface Rucher {
  id: number;
  nom: string;
  ruches: Ruche[];
}

export interface Hive {
  id: number;
  apiary_id: number;
  name: string;
  type: string;
  installation_date: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  editing: boolean;
}

export interface Apiary {
  id: number;
  user_id: number;
  name: string;
  location: string;
  description: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  hives: Hive[];
}

