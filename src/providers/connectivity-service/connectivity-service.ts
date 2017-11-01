import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
/*
  Generated class for the ConnectivityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var Connection;

@Injectable()
export class ConnectivityServiceProvider {

onDevice: boolean;

  constructor(private network: Network, public platform: Platform) { //public http: Http
    this.onDevice = this.platform.is('cordova');
    console.log('Hello ConnectivityServiceProvider Provider');
  }

  isOnline(): boolean {
      if(this.onDevice && this.network.type){
        return this.network.type !== Connection.NONE;
      } else {
        return navigator.onLine;
      }
    }

    isOffline(): boolean {
      if(this.onDevice && this.network.type){
        return this.network.type === Connection.NONE;
      } else {
        return !navigator.onLine;
      }
    }
}
