import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { PAGES } from '../pages';
import { ClientService } from '../services/client.service';
import { DBService } from '../services/db.service';
import { MyApp } from './app.component';

@NgModule({
  declarations: [MyApp, ...PAGES],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...PAGES],
  providers: [
    StatusBar,
    SplashScreen,
    ClientService,
    DBService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
