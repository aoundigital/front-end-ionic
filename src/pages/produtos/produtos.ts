import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id'); // pega o parâmetro enviado da pagina de categorias.
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response =>{
        this.items = response['content'];//pega na resposta só o atriboto content. 
      },
    error => {});
  }

}
