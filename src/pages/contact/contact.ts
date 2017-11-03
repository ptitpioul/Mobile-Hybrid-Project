import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { AndroidPermissions } from '@ionic-native/android-permissions';

import { AlertController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';

import firebase from 'firebase';

import { LoginPage } from '../login/login';

import { AuthProvider } from '../../providers/auth/auth';
import {
  IonicPage,
  Loading,
  LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

private imageSrc: string;
public loading: Loading;

  constructor(public loadingCtrl: LoadingController, public authProvider: AuthProvider, private imagePicker: ImagePicker,
    private alertController: AlertController, private androidPermissions: AndroidPermissions, private camera: Camera, public navCtrl: NavController) {

  }

  private openGallery (): void {

/*    let alert = this.alertController.create({
      message: "ALORS",
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
*/
    let cameraOptions = {
  /*    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true

      */
    //  quality: 100,
    //  destinationType: this.camera.DestinationType.DATA_URL,
    //  encodingType: this.camera.EncodingType.JPEG,
    //  mediaType: this.camera.MediaType.PICTURE,
      maximumImagesCount: 1


  /*    quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,

      */
    }

/*    this.imagePicker.getPictures(cameraOptions).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          this.imageSrc = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          // Handle error
        });
        */
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      success => this.imagePicker.getPictures(cameraOptions)
        .then(file_uri => this.imageSrc = file_uri,
        err => console.log(err)),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    );

//  this.uploadPictureToFirebase();

  /* this.imagePicker.getPictures(cameraOptions)
    .then(file_uri => this.imageSrc = file_uri,
    err => console.log(err));
*/
  }


uploadPictureToFirebase() : void {



      let storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);

      // Create a reference to 'images/todays-date.jpg'
      //const imageRef = storageRef.child(`images/${filename}.jpg`);
      const imageRef = storageRef.child('todays-date.jpg');

      imageRef.putString(this.imageSrc, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     // Do something here when the data is succesfully uploaded!

     let alert = this.alertController.create({
           message: "ALORS",
           buttons: [
             {
               text: "Ok",
               role: 'cancel'
             }
           ]
         });
         alert.present();
    });
    }

    logout(): void {

    //  this.events.publish('user:logout');
//    this.navCtrl.setRoot(LoginPage);
  this.authProvider.logoutUser();
    window.location.reload();


      }

}
