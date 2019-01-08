import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService implements Resolve<any> {
  baseUrl = environment.apiUrl + 'users/';
  users: any[];
  onUsersChanged: BehaviorSubject<any>;


  constructor(private _httpClient: HttpClient) { 
    this.onUsersChanged = new BehaviorSubject({});
    
  }

  //  /**
  //    * Resolver
  //    *
  //    * @param {ActivatedRouteSnapshot} route
  //    * @param {RouterStateSnapshot} state
  //    * @returns {Observable<any> | Promise<any> | any}
  //    */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUsers()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    //  /**
    //  * Get products
    //  *
    //  * @returns {Promise<any>}
    //  */
    getUsers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.baseUrl + 'getAllUsers/')
                .subscribe((response: any) => {
                    this.users = response;
                    // console.log(this.users);
                    
                    this.onUsersChanged.next(this.users);
                    resolve(response);
                }, reject);
        });
    }
}
