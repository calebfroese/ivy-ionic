import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { ClientService } from '../../services/client.service';

@Component({
  selector: 'page-view-client',
  templateUrl: 'view-client.html',
})
export class ViewClientPage {
  get client() {
    return this.service.selected;
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ClientService,
  ) {
    this.service.select(navParams.get('clientId'));
  }
}
