import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import { Create, Update } from '../../actions/job.actions';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html',
})
export class JobPage {
  id: string;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<any>,
    public fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id: new FormControl(),
      date: new FormControl(new Date().toISOString()),
      createdAt: new FormControl(new Date().toISOString()),
      estHours: new FormControl(),
      notes: new FormControl(),
    });
    this.form.patchValue(navParams.get('job') || {});
  }

  submit(value: Job) {
    if (!value.id) this.store.dispatch(new Create(value));
    else this.store.dispatch(new Update(value));
    this.navCtrl.pop();
  }
}
