import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from 'app/_models/user';


@Injectable({
    providedIn: 'root'
})
export class AdminUserService implements Resolve<any> {
  baseUrl = environment.apiUrl + 'users/';
    routeParams: any;
    user: any;
    onUserChanged: BehaviorSubject<any>;

    /**
     *
     */
    constructor(private _httpClient: HttpClient) {
        this.onUserChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([this.getProduct()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getProduct(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onUserChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(this.baseUrl +  this.routeParams.id)
                    .subscribe((response: any) => {
                        this.user = response;
                        
                        this.onUserChanged.next(this.user);
                        resolve(response);
                    }, reject);
            }
        });
    }

    // saveUser(user): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.post(this.baseUrl + user.id, user)
    //             .subscribe((response: any) => {
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

    saveUser(id: number, user: User): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(this.baseUrl + user.id, user)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
