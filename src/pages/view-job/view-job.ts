import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
    public camera: Camera,
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

  async takePicture() {
    const pic = await this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
    });
    debugger;
  }
}
