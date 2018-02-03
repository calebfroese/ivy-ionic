import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ClientService } from '../../services/client.service';
import { CreateClientPage } from '../create-client/create-client';
import { ViewClientPage } from '../view-client/view-client';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  constructor(public navCtrl: NavController, public service: ClientService) {}

  select(clientId) {
    this.navCtrl.push(ViewClientPage, {
      clientId: clientId,
    });
  }

  create() {
    this.navCtrl.push(CreateClientPage);
  }
}
