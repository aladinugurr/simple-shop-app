import { Component } from '@angular/core';
import {products} from './products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = "shop";

    // Ürünler Listesi
  products = products;
  //Sepet
  basket : Product[] = [];
  // Sepet Fiyatı Hesaplama 
  getTotal() : string {
    let total = 0;

    for(let item of this.basket){
      total = total + (item.price * item.quantity)
    }
    return total.toFixed(2) + " TL";
  }

  decreaseAmount(product : Product) : void {
    // Ürün miktarı 0 ise bir şey yapma
    if(product.quantity == 0){
      return;
    }

    // Ürün miktarını azalt
    product.quantity--;
  
    //Ürün miktarı 0 olursa sepetten çıkart
    if(product.quantity == 0){
      let index = this.basket.indexOf(product);
      this.basket.splice(index, 1);
    }
  }
  increaseAmount(product : Product) : void {
      // Sepette yoksa ekle
      if(!this.basket.includes(product)){
        this.basket.push(product)
      }
      // Ürün miktarını arttır
      product.quantity++;
    
  }
  removeIfZero(product : Product) : void {
    if(product.quantity == 0){

      let index = this.basket.indexOf(product);
      this.basket.splice(index, 1);
    }
    
    }
    addIfNotBasket(product : Product) : void {
      if(!this.basket.includes(product) && product.quantity > 0){

        this.basket.push(product);
      }
    }
    updateBasket(product : Product) : void {
      // Ürün miktarı 0 olursa sepetten çıkart
      this.removeIfZero(product);    
      // Sepette yoksa ekle
      this.addIfNotBasket(product);
    }
  }

type Product = {
  id : number,
  name : string,
  photoPath : string,
  price : number,
  unit : string,
  quantity : number

}