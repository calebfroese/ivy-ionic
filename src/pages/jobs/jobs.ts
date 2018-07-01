import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Delete } from '../../actions/job.actions';
import { getJobs } from '../../reducers';

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage implements OnInit {
  job$: Observable<Job[]>;

  constructor(public navCtrl: NavController, public store: Store<any>) {}

  ngOnInit() {
    this.job$ = this.store.select(getJobs);
  }

  delete(client: Client) {
    this.store.dispatch(new Delete(client.id));
  }
}
