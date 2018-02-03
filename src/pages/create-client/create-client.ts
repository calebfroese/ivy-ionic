import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-create-client',
  templateUrl: 'create-client.html',
})
export class CreateClientPage {
  form: FormGroup;

  constructor(public navCtrl: NavController, public fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl(),
      address: new FormControl(),
    });
  }

  create(value) {
    console.log(value);
  }
}
