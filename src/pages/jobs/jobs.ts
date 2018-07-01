import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Delete } from '../../actions/job.actions';
import { getJobs } from '../../reducers';
import { JobPage } from '../job/job';

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage implements OnInit {
  jobs$: Observable<Job[]>;

  constructor(public navCtrl: NavController, public store: Store<any>) {}

  ngOnInit() {
    this.jobs$ = this.store.select(getJobs);
  }

  select(job) {
    this.navCtrl.push(JobPage, { job });
  }

  create() {
    this.navCtrl.push(JobPage);
  }

  delete(job: Job) {
    this.store.dispatch(new Delete(job.id));
  }
}
