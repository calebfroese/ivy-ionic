interface Client {
  id: string;
  name: string;
  address: string;
}

interface Job {
  id: string;
  clientId: string;
  date: Date;
  createdAt: Date;
}
