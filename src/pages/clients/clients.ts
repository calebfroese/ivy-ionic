import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { getClients } from '../../reducers';
import { ClientPage } from '../client/client';
import { Delete } from '../../actions/client.actions';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage implements OnInit {
  clients$: Observable<Client[]>;

  constructor(public navCtrl: NavController, public store: Store<any>) {}

  ngOnInit() {
    this.clients$ = this.store.select(getClients);
  }

  select(client) {
    this.navCtrl.push(ClientPage, { client });
  }

  create() {
    this.navCtrl.push(ClientPage);
  }

  delete(client: Client) {
    this.store.dispatch(new Delete(client.id));
  }
}
