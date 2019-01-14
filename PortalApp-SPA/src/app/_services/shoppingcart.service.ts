import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { createHttpObservable } from 'app/utils/util';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCart } from 'app/main/shopping-cart/shoppingCart.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    baseUrl = environment.apiUrl + 'shoppingCart/';

    subject$ = new BehaviorSubject<ShoppingCart[]>([]);

    data: ShoppingCart[];

    shop_data: ShoppingCart[] = [
        {
            id: '1',
            productId: '1',
            productCount: 1,
            userId: 1
        },
        {
            id: '2',
            productId: '2',
            productCount: 2,
            userId: 1
        },
        {
            id: '31',
            productId: '3',
            productCount: 3,
            userId: 1
        }
    ];

    constructor(private http: HttpClient) {
        this.initialize();

        this.subject$.subscribe(res => {
            this.data = res;
        });
    }

    initialize(): any {
        this.subject$.next(this.shop_data);
    }

    addShoppingCart(shoppingCart: ShoppingCart): void {
        // this.shop_data.push({
        //     id: '4',
        //     productId: '4',
        //     productCount: 4,
        //     userId: 1
        // });
        this.shop_data.push(shoppingCart);

        this.subject$.next(this.shop_data);
    }

    getData(): ShoppingCart[] {
        return this.data;
    }
    // getNavig(lang: string): any {
    //     return createHttpObservable(
    //         this.baseUrl + `getNavig/${lang}`
    //     );
    // }

    // // tslint:disable-next-line:typedef
    // addNavig(navig: any) {
    //     console.log('NavigUpdate: ', navig);
    //     console.log('Path: ', this.baseUrl + 'add/');

    //    return this.http.post(this.baseUrl + 'add/', navig);
    //     // this.http.post(this.baseUrl + 'addId/', 1);
    // }
}
