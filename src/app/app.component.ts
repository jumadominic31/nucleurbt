import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage' ;

import { BookingPage } from './../pages/booking/booking';
import { DeliveryPage } from './../pages/delivery/delivery';
import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  username: string;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public event: Events, public auth: AuthServiceProvider, public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Booking', component: BookingPage },
      { title: 'Delivery', component: DeliveryPage },
      { title: 'Logout', component: null}
    ];

    this.event.subscribe('userLogged',(data)=>{
      this.username = data;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component) {
      this.nav.setRoot(page.component);
    }
    else {
      this.storage.remove('cities');
      this.storage.remove('vehicles');
      this.storage.remove('userDetails');
      this.nav.setRoot(LoginPage);
    }
  }
}

