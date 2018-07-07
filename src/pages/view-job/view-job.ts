import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-viewjob',
  templateUrl: 'view-job.html',
})
export class ViewJobPage implements OnInit {
  job: Job;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<any>,
  ) {
    this.job = navParams.get('job');
  }

  ngOnInit() {}
}
