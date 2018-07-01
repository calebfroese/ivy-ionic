import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import * as uuid from 'uuid';

import { Create } from '../../actions/client.actions';

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
    this.id = navParams.get('clientId');
    this.form = this.fb.group({
      id: new FormControl(this.id || uuid()),
      name: new FormControl(),
      address: new FormControl(),
    });
  }

  submit(value) {
    this.store.dispatch(new Create(value));
    this.navCtrl.pop();
  }
}
