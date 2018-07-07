import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Delete } from '../../actions/job.actions';
import { getJobs } from '../../reducers';
import { JobPage } from '../job/job';
import { ViewJobPage } from '../view-job/view-job';

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage implements OnInit {
  jobs$: Observable<Job[]>;
  completedJobs$: Observable<Job[]>;
  incompleteJobs$: Observable<Job[]>;
  filter: 'incomplete' | 'completed' = 'incomplete';

  constructor(public navCtrl: NavController, public store: Store<any>) {}

  ngOnInit() {
    this.jobs$ = this.store.select(getJobs);
    this.completedJobs$ = this.jobs$.pipe(
      map(jobs => jobs.filter(job => {
        var x = !!job.finishedAt;
        console.log(x);
        return x;
      })),
    );
    this.incompleteJobs$ = this.jobs$.pipe(
      map(jobs => jobs.filter(job => !job.finishedAt)),
    );
  }

  view(job: Job) {
    this.navCtrl.push(ViewJobPage, { job });
  }

  edit(job: Job) {
    this.navCtrl.push(JobPage, { job });
  }

  create() {
    this.navCtrl.push(JobPage);
  }

  delete(job: Job) {
    this.store.dispatch(new Delete(job.id));
  }
}
