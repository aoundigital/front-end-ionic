import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService){        
    }

    createOrClearCart() : Cart {
        let cart : Cart = {itens: []}; // variavel com um carrinho vazio.
        this.storage.setCart(cart); // armazena o carrinho no LocalStorage
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart(); // retorna um carrinho existente no LocalStorage
        if(cart == null){
            cart = this.createOrClearCart(); // se não tiver carrinho cria um vazio.
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();//pegou o carrinho
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);//procura se tem o produto no carrinho, se não retorna -1
        if(position == -1){//se não tem o produto escolhido.
            cart.itens.push({quantidade: 1, produto: produto}); //colocamos um produto no carrinho.
        }
        this.storage.setCart(cart);//guarda novo carrinho no LocalStorage.
        return cart;
    }

}