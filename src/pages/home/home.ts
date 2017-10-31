import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

import { LoginPage } from '../login/login';

import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public events: Events, public navCtrl: NavController, public authProvider: AuthProvider,
    ) {

  }

  logout(): void {
    this.authProvider.logoutUser();
  //  this.events.publish('user:logout');
  this.navCtrl.setRoot(LoginPage)
    }

}
