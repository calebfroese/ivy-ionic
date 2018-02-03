import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable()
export class ClientService {
  clients: any[];
  _selected: string;
  get selected() {
    return this.clients.find(client => client.id === this._selected);
  }

  constructor() {
    this.clients = [{ id: uuid(), name: 'Bob', address: '123 Example Avenue' }];
  }

  create(value: any) {
    this.clients.push(value);
  }

  select(id: string) {
    this._selected = id;
  }
}
