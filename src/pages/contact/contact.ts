import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { AndroidPermissions } from '@ionic-native/android-permissions';

import { AlertController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

private imageSrc: string;

  constructor(private imagePicker: ImagePicker, private alertController: AlertController, private androidPermissions: AndroidPermissions, private camera: Camera, public navCtrl: NavController) {

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
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      maximumImagesCount: 1
    }

/*    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      success => this.camera.getPicture(cameraOptions)
        .then(file_uri => this.imageSrc = file_uri,
        err => console.log(err)),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    );
*/
   this.imagePicker.getPictures(cameraOptions)
    .then(file_uri => this.imageSrc = file_uri,
    err => console.log(err));

  }


}
