import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = TabsPage;
  rootPage:any;

  constructor(public events: Events, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
/*    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
*/
firebase.initializeApp({
apiKey: "AIzaSyDo5IhmNsGXXTOr2m2cqIBXlfzjW5LgEe0",
authDomain: "ozalentour-694b3.firebaseio.com",
databaseURL: "https://ozalentour-694b3.firebaseio.com/",
storageBucket: "ozalentour-694b3.appspot.com",
messagingSenderId: ""
});
    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });

/*    events.subscribe('user:logout', () => {
      unsubscribe();
      alert("TEST")
    });
    */
      }

}
