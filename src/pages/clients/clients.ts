import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ClientService } from '../../services/client.service';
import { ClientPage } from '../client/client';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  constructor(public navCtrl: NavController, public service: ClientService) {}

  select(clientId) {
    this.navCtrl.push(ClientPage, {
      clientId: clientId,
    });
  }

  create() {
    this.navCtrl.push(ClientPage);
  }
}
