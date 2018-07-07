import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';

import { Create, Update } from '../../actions/client.actions';

@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  id: string;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<any>,
    public fb: FormBuilder,
  ) {
    const client = navParams.get('client') || {};
    this.form = this.fb.group({
      id: new FormControl(client.id),
      name: new FormControl(client.name),
      address: new FormControl(client.address),
      phone: new FormControl(client.phone),
    });
  }

  submit(value: Client) {
    if (!value.id) this.store.dispatch(new Create(value));
    else this.store.dispatch(new Update(value));
    this.navCtrl.pop();
  }
}
