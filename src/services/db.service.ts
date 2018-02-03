import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DBService {
  ID_CLIENTS = 'ALLCLIENTS';

  constructor(private storage: Storage) {}

  async createClient(value) {
    const { id } = value;
    const y = await this.pushIdToArray(this.ID_CLIENTS, id);
    const x = await this.create(value);
  }

  async getClient(id: string) {
    return this.get(id);
  }

  async getClients() {
    const ids = await this.getIdArray(this.ID_CLIENTS);
    return Promise.all(ids.map(id => this.get(id)));
  }

  private async pushIdToArray(ref: string, id: string) {
    const val = await this.get(ref);
    const ids = JSON.parse(val);
    ids.push(id);
    return this.storage.set(ref, ids);
  }
  private async getIdArray(ref: string) {
    const val = await this.get(ref);
    const parsed: string[] = JSON.parse(val);
    return parsed;
  }
  private async get(id) {
    return this.storage.get(id);
  }
  private async create(value) {
    return this.storage.set(value.id, value);
  }
  private async update(value) {
    return this.storage.set(value.id, value);
  }
  private async delete(id) {
    return this.storage.remove(id);
  }
}
