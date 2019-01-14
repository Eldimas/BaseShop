import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCart } from './shoppingCart.model';
import { ShoppingCartService } from 'app/_services/shoppingcart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  data: ShoppingCart[];

  

  constructor(private _shoppingCartService: ShoppingCartService) { 
    this.data = _shoppingCartService.getData();
  }

  ngOnInit(): void {
  }


  addShoppingCart(): void {

    // this._shoppingCartService.addShoppingCart();
    // this.data = this._shoppingCartService.getData();
    
  }

}
