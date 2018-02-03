import { Injectable } from '@angular/core';

@Injectable()
export class ClientService {
  clients: any[] = [{ name: 'Bob', address: '123 Example Avenue' }];

  create(client: any) {
    this.clients.push(client);
  }
}
