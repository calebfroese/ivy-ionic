import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateClientPage } from '../create-client/create-client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  constructor(public navCtrl: NavController, public service: ClientService) {}

  select(client) {
    this.navCtrl.push(ClientsPage, {
      client: client,
    });
  }

  create() {
    this.navCtrl.push(CreateClientPage);
  }
}
