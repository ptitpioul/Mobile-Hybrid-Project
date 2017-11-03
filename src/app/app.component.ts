import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

import { Events } from 'ionic-angular';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = TabsPage;
  rootPage:any;

  constructor(public alertController: AlertController, public push: Push, public events: Events, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
    });

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

      pushsetup() {
         const options: PushOptions = {
          android: {
            
          },
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
          },
          windows: {}
       };

       const pushObject: PushObject = this.push.init(options);

       pushObject.on('notification').subscribe((notification: any) => {
         if (notification.additionalData.foreground) {
           let youralert = this.alertController.create({
             title: 'New Push notification',
             message: notification.message
           });
           youralert.present();
         }
       });

       pushObject.on('registration').subscribe((registration: any) => {
          //do whatever you want with the registration ID
       });

       pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
       }
}
