interface Client {
  id: string;
  name: string;
  address: string;
  jobs?: Job[];
}

interface Job {
  id: string;
  clientId: string;
  client?: Client;
  date: Date;
  createdAt: Date;
  estHours: number;
  notes: string;
}
