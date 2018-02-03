import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import * as uuid from 'uuid';

import { ClientService } from '../../services/client.service';

@Component({
  selector: 'page-create-client',
  templateUrl: 'create-client.html',
})
export class CreateClientPage {
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public service: ClientService,
    public fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id: new FormControl(uuid()),
      name: new FormControl(),
      address: new FormControl(),
    });
  }

  create(value) {
    this.service.create(value);
    this.navCtrl.pop();
  }
}
