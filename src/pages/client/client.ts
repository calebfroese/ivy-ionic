import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import * as uuid from 'uuid';

import { ClientService } from '../../services/client.service';

@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ClientService,
    public fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      address: new FormControl(),
    });
    const clientId = navParams.get('clientId');
    if (clientId) {
      this.service.select(clientId);
      this.form.patchValue(this.service.selected);
    } else {
      this.form.patchValue({ id: uuid() });
    }
  }

  submit(value) {
    this.service.upsert(value);
    this.navCtrl.pop();
  }
}
