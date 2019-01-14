import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { createHttpObservable } from 'app/utils/util';
import { HttpClient } from '@angular/common/http';
import { Product } from 'app/main/products/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    baseUrl = environment.apiUrl + 'products/';

    products: Product[] = [
        {
            id: '111',
            title: 'title 111'
        },
        {
            id: '222',
            title: 'title 2222'
        },
        {
            id: '333',
            title: 'title 333'
        }
    ];

    constructor(private http: HttpClient) {}

    getProducts(): Product[] {
        return this.products;
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
