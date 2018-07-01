import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AppEffects } from '../effects/app.effects';
import { ClientEffects } from '../effects/client.effects';
import { JobEffects } from '../effects/job.effects';
import { PAGES } from '../pages';
import { DayPipe } from '../pipes/dayjs.pipe';
import { metaReducers, reducers } from '../reducers';
import { ClientService } from '../services/client.service';
import { MyApp } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    EffectsModule.forRoot([AppEffects, ClientEffects, JobEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  declarations: [MyApp, DayPipe, ...PAGES],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...PAGES],
  providers: [
    StatusBar,
    SplashScreen,
    ClientService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
