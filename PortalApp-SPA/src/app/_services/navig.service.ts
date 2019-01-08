import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { createHttpObservable } from 'app/utils/util';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NavigService {
    baseUrl = environment.apiUrl + 'navig/';

    constructor(private http: HttpClient) {}
    getNavig(lang: string): any {
        return createHttpObservable(
            this.baseUrl + `getNavig/${lang}`
        );
    }

    // tslint:disable-next-line:typedef
    addNavig(navig: any) {
        console.log('NavigUpdate: ', navig);
        console.log('Path: ', this.baseUrl + 'add/');
        
       return this.http.post(this.baseUrl + 'add/', navig);
        // this.http.post(this.baseUrl + 'addId/', 1);
    }
}
