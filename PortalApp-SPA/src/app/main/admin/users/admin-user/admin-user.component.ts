import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { AdminUserService } from './admin-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AdminUser } from './admin-user.model';
import { AuthService } from 'app/_services/auth.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class AdminUserComponent implements OnInit, OnDestroy {

  adminUser: AdminUser;
  userForm: FormGroup;
  pageType: string;
   // Private
   private _unsubscribeAll: Subject<any>;
   
  constructor(
    private _adminUserService: AdminUserService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private authService: AuthService
    ) { 
      this.adminUser = new AdminUser();
      this._unsubscribeAll = new Subject();
    }

  ngOnInit(): void {
    this._adminUserService.onUserChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(user => {
        if ( user) {
          this.adminUser = new AdminUser(user);
          this.pageType = 'edit';
        }
        else  {
          console.log('some error');
          this.pageType = 'new';
        }

        this.userForm = this.createUserForm();
      });
  }

  ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // id: number;
    // userName: string;
    // gender: string;
    // dateOfBirth: string;
    // knownAs: string;
    // created: string;
    // lastActive: string;
    // introduction: string;
    // lookingFor: string;
    // interests: string;
    // city: string;
    // country: string;
    // photos: [
    //     {
    //        'id': number, 
    //        'url': string,
    //        'description': string,
    //        'dateAdded': string,
    //        'isMain': boolean,
    //        'publicId': string,
    //        'isApproved': boolean,
    //        'userId': number
    //     }
    // ];

    createUserForm(): FormGroup {
      return this._formBuilder.group({
        id: [this.adminUser.id],
        userName: [this.adminUser.userName],
        gender: [this.adminUser.gender],
        dateOfBirth: [this.adminUser.dateOfBirth],
        knownAs: [this.adminUser.knownAs],
        created: [this.adminUser.created],
        lastActive: [this.adminUser.lastActive],
        introduction: [this.adminUser.introduction],
        lookingFor: [this.adminUser.lookingFor],
        interests: [this.adminUser.interests],
        city: [this.adminUser.city],
        country: [this.adminUser.country],
        photos: [this.adminUser.photos]
      });
    }

     /**
     * Save product
     */
    saveUser(): void
    {
        const data = this.userForm.getRawValue();
        data.handle = FuseUtils.handleize(data.userName);
        // console.log('save: ', data);
        

        this._adminUserService.saveUser(this.authService.decodedToken.nameid, data)
            .then(() => {

                // Trigger the subscription with new data
                this._adminUserService.onUserChanged.next(data);

                // Show the success message
                this._matSnackBar.open('User saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

}
