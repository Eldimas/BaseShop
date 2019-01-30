import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { createHttpObservable } from 'app/utils/util';
import { HttpClient } from '@angular/common/http';
import { Category } from 'app/_models/category';
import { Observable } from 'rxjs';
import { Product } from 'app/main/products/product.model';
import { CategoryProductUpdate } from 'app/_models/categoryProductUpdate.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    baseUrl = environment.apiUrl + 'category/';

    constructor(private http: HttpClient) {}
    getCategories(lang: string): any {
        return createHttpObservable(
            this.baseUrl + `getCategories/${lang}`
        );
    }

    getCategory(lang: string, id: string): Observable<Category> {
        return createHttpObservable(
            this.baseUrl + `getCategory/${lang}/${id}`
        );
    }

    getProductsByCategoryId(lang: string, id: string): Observable<Product[]> {
        return createHttpObservable(
            this.baseUrl + `getProductsByCategoryId/${lang}/${id}`
        ); 
    }

    getCategoriesByProductId(id: string): Observable<Category[]> {
        return createHttpObservable(
            this.baseUrl + `getCategoriesByProductId/${id}`
        ); 
    }

    // tslint:disable-next-line:typedef
    updateCategoryInProduct(productId: string, categories: string[]) {
        // console.log(`ProductId: ${productId}`);
        const catProd = new CategoryProductUpdate(
            {
                productId: productId,
                categories: categories
            }
        );
        // catProd.productId = productId;
        // catProd.categories = categories;


        console.log(categories);
        console.log('URLurl: ', this.baseUrl + `updateCategoryInProduct/${productId}`);
        
      return  this.http.post(this.baseUrl + 'updateCategoryInProduct/', catProd);
    }


    // tslint:disable-next-line:typedef
    addCategory(category: any) {
        console.log('NavigUpdate: ', category);
        console.log('Path: ', this.baseUrl + 'add/');
        
       return this.http.post(this.baseUrl + 'add/', category);
        // this.http.post(this.baseUrl + 'addId/', 1);
    }

    // tslint:disable-next-line:typedef
    removeCategory(id: string) {
        const path = this.baseUrl + 'remove/' + id;
      return  this.http.delete(this.baseUrl + 'remove/' + id);
        console.log('id: ', id);
        
    }
}
