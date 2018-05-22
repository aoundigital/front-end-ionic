import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  itens: CategoriaDTO[];
  bucketBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.itens = response;
      },
      error => {});
  }

  showProdutos(categoria_id : string){
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});// passando o codigo da categoria para a página de produtos
  }
}
