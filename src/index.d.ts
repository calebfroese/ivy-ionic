interface Client {
  id: string;
  name: string;
  address: string;
  phone: string;
  jobs?: Job[];
}

interface Job {
  id: string;
  clientId: string;
  client?: Client;
  date: Date;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
  estHours: number;
  quote?: number;
  notes: string;
}
