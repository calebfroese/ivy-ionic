import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateClientPage } from '../create-client/create-client';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  clients: any;

  constructor(public navCtrl: NavController) {
    this.clients = [];
    for (let i = 1; i < 11; i++) {
      this.clients.push({
        name: 'Bob',
        address: '22 Rawlings Road',
      });
    }
  }

  select(client) {
    this.navCtrl.push(ClientsPage, {
      client: client,
    });
  }

  create() {
    this.navCtrl.push(CreateClientPage);
  }
}
