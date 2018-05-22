import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;

  constructor(public navCtrl: NavController, 
              public menuCtrl: MenuController, 
              public navParams: NavParams, 
              public storage: StorageService,
              public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response;
        this.getImageIfExists();
      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage'); //se o erro for 403 ir para Home.
        }
      });
    }
    else{
      this.navCtrl.setRoot('HomePage'); // se tiver problema com o usuário ir para Home.
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }
  
  openMenu() {
    this.menuCtrl.open();
  }

}
