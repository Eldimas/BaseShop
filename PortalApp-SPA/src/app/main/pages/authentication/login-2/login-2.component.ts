import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSnackBar,
  } from '@angular/material';

//   import { MatSnackBar  } from './login-2.module';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/_services/auth.service';
import { Router } from '@angular/router';


export interface Countries {
    value: string;
    viewValue: string;
  }

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;
    submitted = false;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    countries: Countries[] = [
        {value: 'ru', viewValue: 'Россия'},
        {value: 'by', viewValue: 'Беларусь'},
        {value: 'kz', viewValue: 'Казахстан'}
      ];
    
    favoriteSeason: string;
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    
    constructor(
        public snackBar: MatSnackBar,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    // ngOnInit(): void
    // {
    //     this.loginForm = this._formBuilder.group({
    //         email   : ['', [Validators.required, Validators.email]],
    //         password: ['', Validators.required]
    //     });
    // }

    ngOnInit(): void
    {
        if (this.authService.loggedIn()){
            this.router.navigate(['/sample']);
        }

        this.loginForm = this._formBuilder.group({
            username   : ['', [Validators.required]],
            password: ['', Validators.required],
            // season: ['', Validators.required],
            // country: ['', Validators.required],
        });
    }

    onSubmit(): void {
        // this.submitted = true;
        // alert(this.loginForm.value);
        // console.log(this.loginForm.value);
        this.authService.login(this.loginForm.value).subscribe(next => {
            // this.alertify.success('Logged in successfully');
            console.log('Logged in successfully');
            this.openSnackBar('Logged in successfully');
          }, error => {
            // this.alertify.error(error);
            console.log(error);
            this.openSnackBar(error);
            console.log(error);
            
          }, () => {
            this.router.navigate(['/home']);
          });
    }

    openSnackBar(message: string): void {
        this.snackBar.open(message, 'End now', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
}
