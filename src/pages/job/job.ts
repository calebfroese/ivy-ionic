import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Create, Update } from '../../actions/job.actions';
import { getClients } from '../../reducers';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html',
})
export class JobPage implements OnInit {
  clients$: Observable<Client[]>;
  job: Job;
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
      quote: new FormControl(),
      notes: new FormControl(),
      client: new FormControl(),
    });
    this.job = navParams.get('job') || {};
    this.form.patchValue(this.job);
  }

  ngOnInit() {
    this.clients$ = this.store.select(getClients);
  }

  submit(value: Job & { client: Client }) {
    if (!value.client) return;
    value.clientId = value.client.id;
    delete value.client;
    if (!value.id) this.store.dispatch(new Create(value));
    else this.store.dispatch(new Update(value));
    this.navCtrl.pop();
  }
}
