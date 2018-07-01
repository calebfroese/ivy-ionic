import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PAGES } from '../pages';
import { metaReducers, reducers } from '../reducers';
import { ClientService } from '../services/client.service';
import { MyApp } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  declarations: [MyApp, ...PAGES],
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
