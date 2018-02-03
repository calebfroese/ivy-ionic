import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { DBService } from './db.service';

@Injectable()
export class ClientService {
  private _selected: string;
  get selected() {
    return this.db.getClient(this._selected);
  }
  get clients() {
    return this.db.getClients();
  }

  constructor(private db: DBService) {
    this.db.createClient({
      id: uuid(),
      name: 'Bob',
      address: '123 Example Avenue',
    });
  }

  async upsert(value: any) {
    await this.db.createClient(value);
  }

  select(id: string) {
    this._selected = id;
  }
}
