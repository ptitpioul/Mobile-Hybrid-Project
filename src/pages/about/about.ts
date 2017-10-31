import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


items: any;

  constructor(public navCtrl: NavController) {


    this.items = [
                'Bread',
                'Milk',
                'Cheese',
                'Snacks',
                'Apples',
                'Bananas',
                'Peanut Butter',
                'Chocolate',
                'Avocada',
                'Vegemite',
                'Muffins',
                'Paper towels'
            ];
  }

}
