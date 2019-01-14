import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/_services/products.service';
import { Product } from './product.model';
import { ShoppingCartService } from 'app/_services/shoppingcart.service';
import { ShoppingCart } from '../shopping-cart/shoppingCart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  constructor(
    private _productsService: ProductsService,
    private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.products = this._productsService.getProducts();
  }

  addToCart(product: Product): any {

   const uuidv1 = require('uuid/v1');
   const shoppingCart: ShoppingCart = new ShoppingCart;
   shoppingCart.id = uuidv1();
   shoppingCart.productId = product.id;
   shoppingCart.productCount = 999;
   shoppingCart.userId = 1;

    this._shoppingCartService.addShoppingCart(
      shoppingCart
    );

  }

}
