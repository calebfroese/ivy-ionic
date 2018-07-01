import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Delete } from '../../actions/job.actions';
import { getJobs } from '../../reducers';
import { JobPage } from '../job/job';

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage implements OnInit {
  jobs$: Observable<Job[]>;
  pastJobs$: Observable<Job[]>;
  upcomingJobs$: Observable<Job[]>;
  view: 'upcoming' | 'past' = 'upcoming';

  constructor(public navCtrl: NavController, public store: Store<any>) {}

  ngOnInit() {
    const startOfToday = dayjs(dayjs().format('YYYY-MM-DD'));
    this.jobs$ = this.store.select(getJobs);
    this.pastJobs$ = this.jobs$.pipe(
      map(jobs => jobs.filter(job => dayjs(job.date).isBefore(startOfToday))),
    );
    this.upcomingJobs$ = this.jobs$.pipe(
      map(jobs => jobs.filter(job => dayjs(job.date).isAfter(startOfToday))),
    );
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
