import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/_services/auth.service';
import { User } from 'app/_models/user';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
    selector     : 'register-2',
    templateUrl  : './register-2.component.html',
    styleUrls    : ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy
{
    registerForm: FormGroup;
    user: User;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    // Private
    private _unsubscribeAll: Subject<any>;

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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.registerForm = this._formBuilder.group({
        //     gender :            ['', Validators.required],
        //     username           : ['', Validators.required],
        //     knownAs          : ['', [Validators.required]],
        //     dateOfBirth         : ['', Validators.required],
        //     city          : ['', [Validators.required]],
        //     country          : ['', [Validators.required]],
        //     password       : ['', Validators.required],
        //     passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        // });

        this.createRegisterForm();

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        // this.registerForm.get('password').valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(() => {
        //         this.registerForm.get('passwordConfirm').updateValueAndValidity();
        //     });
    }

    // tslint:disable-next-line:typedef
    createRegisterForm() {
        this.registerForm = this._formBuilder.group({
          gender: ['male'],
          username: ['', Validators.required],
          knownAs: ['', Validators.required],
        //   dateOfBirth: [null, Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
          confirmPassword: ['', Validators.required]
        }, {validator: this.passwordMatchValidator});
      }

      // tslint:disable-next-line:typedef
      passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
      }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    // tslint:disable-next-line:typedef
    register() {
        // if (this.registerForm.valid) {
        //   this.user = Object.assign({}, this.registerForm.value);
        //   this.authService.register(this.user).subscribe(() => {
        //     this.alertify.success('Registration successful');
        //   }, error => {
        //     this.alertify.error(error);
        //   }, () => {
        //     this.authService.login(this.user).subscribe(() => {
        //       this.router.navigate(['/members']);
        //     });
        //   });
        // }

        if (this.registerForm.valid) {
          this.user = Object.assign({}, this.registerForm.value);
          this.authService.register(this.user).subscribe(() => {
            this.openSnackBar('Registered in successfully');
          }, error => {
              this.openSnackBar(error);
          }, () => {
            this.authService.login(this.user).subscribe(() => {
              this.router.navigate(['/home']);
            });
          });
        }
        
        
      }

      openSnackBar(message: string): void {
        this.snackBar.open(message, 'End now', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
}

// /**
//  * Confirm password validator
//  *
//  * @param {AbstractControl} control
//  * @returns {ValidationErrors | null}
//  */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
