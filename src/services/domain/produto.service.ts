import { API_CONFIG } from "./../../config/api.config";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){        
    }

    findByCategoria(categoria_id : string) { //recebe o ID da Categoria
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);//monta s URL para o GET 
    }

    getSmallImageFromBucket(id : string) : Observable<any>{ 
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg` // cria a url das imagens com ID do produto.
        return this.http.get(url, {responseType : 'blob'});// GET na url da imagem.
    }
}