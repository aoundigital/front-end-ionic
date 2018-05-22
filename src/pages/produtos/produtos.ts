import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { API_CONFIG } from '../../config/api.config';

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
        this.loadImageUrls(); // chama o método para trazer a imagem de cada produto.
      },
    error => {});
  }

  loadImageUrls(){
    for(var i=0; i<this.items.length; i++){ //percorrer a lista de produtos
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id) //pega o id do produto
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;//monta a URL da imagem do produto.
        },
      error => {});
    }
  }

}
