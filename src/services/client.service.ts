import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable()
export class ClientService {
  clients: Map<string, any>;
  private _selected: string;
  get selected() {
    return this.clients.get(this._selected);
  }
  get clientArray() {
    return Array.from(this.clients).map(c => c[1]);
  }

  constructor() {
    this.clients = new Map();
    const id = uuid();
    this.clients.set(id, { id, name: 'Bob', address: '123 Example Avenue' });
  }

  upsert(value: any) {
    this.clients.set(value.id, value);
  }

  select(id: string) {
    this._selected = id;
  }
}
