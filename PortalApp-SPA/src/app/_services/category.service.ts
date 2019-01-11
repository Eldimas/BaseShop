import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { createHttpObservable } from 'app/utils/util';
import { HttpClient } from '@angular/common/http';

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
