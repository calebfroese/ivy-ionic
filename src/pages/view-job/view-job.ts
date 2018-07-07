import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { map, switchMap, filter } from 'rxjs/operators';
import * as moment from 'moment';

import { Finish, Start } from '../../actions/job.actions';
import { getJobs } from '../../reducers';

@Component({
  selector: 'page-viewjob',
  templateUrl: 'view-job.html',
})
export class ViewJobPage implements OnInit {
  job$: Observable<Job>;
  runtime$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<any>,
  ) {}

  ngOnInit() {
    const job = this.navParams.get('job');
    this.job$ = this.store
      .select(getJobs)
      .pipe(map(jobs => jobs.find(j => j.id === job.id)));
    this.runtime$ = interval(1000).pipe(
      switchMap(() => this.job$),
      map(job =>
        moment
          .duration(Date.now() - job.startedAt.valueOf(), 'milliseconds')
          .humanize(),
      ),
    );
  }

  start(job: Job) {
    this.store.dispatch(new Start(job));
  }

  finish(job: Job) {
    this.store.dispatch(new Finish(job));
  }
}
