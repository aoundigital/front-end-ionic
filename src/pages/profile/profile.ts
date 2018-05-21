import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email : string;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams, public storage: StorageService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.email = localUser.email;
    }
  }
  
  openMenu() {
    this.menuCtrl.open();
  }

}
