import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { filter, map, switchMap } from 'rxjs/operators';

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
    this.runtime$ = timer(0, 1000).pipe(
      switchMap(() => this.job$),
      filter(job => !!job.startedAt),
      map(job =>
        moment
          .utc(moment(job.finishedAt).diff(moment(job.startedAt)))
          .format('HH:mm:ss'),
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
