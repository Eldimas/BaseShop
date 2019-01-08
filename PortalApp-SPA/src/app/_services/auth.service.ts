import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiUrl + 'auth/';
    jwtHelper = new JwtHelperService();
    decodedToken: any;
    currentUser: User;
    photoUrl = new BehaviorSubject<string>('../../assets/user.png');
    currentPhotoUrl = this.photoUrl.asObservable();

    constructor(
        private http: HttpClient,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // tslint:disable-next-line:typedef
    changeMemberPhoto(photoUrl: string) {
        this.photoUrl.next(photoUrl);
    }

    // tslint:disable-next-line:typedef
    checkAdminMenu() {
        const token = localStorage.getItem('token');

        if (token) {
            this.decodedToken = this.jwtHelper.decodeToken(token);
            if (this.roleMatch(['Admin'] as Array<string>)) {
                this._fuseNavigationService.updateNavigationItem(
                    'administration',
                    {
                        hidden: false
                    }
                );
               return; 
            }
            
        } 
        
        this._fuseNavigationService.updateNavigationItem('administration', {
          hidden: true
      });
    }

    // tslint:disable-next-line:typedef
    login(model: any) {
        console.log(model);

        return this.http.post(this.baseUrl + 'login', model).pipe(
            map((response: any) => {
                const user = response;
                if (user) {
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('user', JSON.stringify(user.user));
                    this.decodedToken = this.jwtHelper.decodeToken(user.token);
                    this.currentUser = user.user;
                    // this.changeMemberPhoto(this.currentUser.photoUrl);
                    this.checkAdminMenu();
                }
            })
        );
    }

    // tslint:disable-next-line:typedef
    register(user: User) {
        console.log('service register: ', user);
        return this.http.post(this.baseUrl + 'register', user);
    }

    // tslint:disable-next-line:typedef
    loggedIn() {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    roleMatch(allowedRoles): boolean {
        let isMatch = false;
        const userRoles = this.decodedToken.role as Array<string>;
        allowedRoles.forEach(element => {
            if (userRoles.includes(element)) {
                isMatch = true;
                return;
            }
        });
        return isMatch;
    }
}
