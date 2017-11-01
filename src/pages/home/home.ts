
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/Geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

    map: any;
    mapInitialised: boolean = false;
    apiKey: any = "AIzaSyDKuNww5E-YK4cX5aqrV-WJ4OxgEJ7qt44";

  constructor(private geolocation: Geolocation, public connectivityServiceProvider: ConnectivityServiceProvider, public events: Events, public navCtrl: NavController, public authProvider: AuthProvider,
    ) {
      this.loadGoogleMaps();
  }

  loadGoogleMaps(){

      this.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if(this.connectivityServiceProvider.isOnline()){
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if(this.apiKey){
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

      }
    }
    else {

      if(this.connectivityServiceProvider.isOnline()){
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }

    }

    }

    initMap(){

      this.mapInitialised = true;

      this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      });

    }

    disableMap(){
      console.log("disable map");
    }

    enableMap(){
      console.log("enable map");
    }

    addConnectivityListeners(){

      let onOnline = () => {

        setTimeout(() => {
          if(typeof google == "undefined" || typeof google.maps == "undefined"){

            this.loadGoogleMaps();

          } else {

            if(!this.mapInitialised){
              this.initMap();
            }

            this.enableMap();
          }
        }, 2000);

      };

      let onOffline = () => {
        this.disableMap();
      };

      document.addEventListener('online', onOnline, false);
      document.addEventListener('offline', onOffline, false);

    }

  logout(): void {
    this.authProvider.logoutUser();
  //  this.events.publish('user:logout');
  this.navCtrl.setRoot(LoginPage)
    }

}
