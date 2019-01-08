import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationKaz } from 'app/navigation/i18n/kz';
import { locale as navigationRussian } from 'app/navigation/i18n/ru';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';
import { NavigService } from './_services/navig.service';
import { Navig } from './_models/navig';
import { LangService } from './_services/lang.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    navigs: Navig[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;
    jwtHelper = new JwtHelperService();

    // /**
    //  * Constructor
    //  *
    //  * @param {DOCUMENT} document
    //  * @param {FuseConfigService} _fuseConfigService
    //  * @param {FuseNavigationService} _fuseNavigationService
    //  * @param {FuseSidebarService} _fuseSidebarService
    //  * @param {FuseSplashScreenService} _fuseSplashScreenService
    //  * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
    //  * @param {Platform} _platform
    //  * @param {TranslateService} _translateService
    //  */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private _authService: AuthService,
        private _navigService: NavigService,
        private _langService: LangService
    ) {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');
       

        // const http$ = this._navigService.getNavig();
        // http$
        //     .subscribe(
        //         navigs => {
        //             console.log('navig: ', navigs);
        //             // this.navigs = navigs;

                    

        //             navigs.forEach(navig => {
        //               const nav = new Navig(navig);
        //               this.navigs.push(nav);
        //             });

        //             console.log('last navig: ', this.navigs);

        //             // Register the new navigation
        //             this._fuseNavigationService.register('navig', navigs);

        //             // Set the current navigation
        //             this._fuseNavigationService.setCurrentNavigation('navig');

        //             // regs.forEach(region => {
        //             //   const regForSel = new RegionForSelection(region);
        //             //   this.regions.push(regForSel);
        //             // });
        //             // this.regions = regs;
        //         },
        //         err => console.log(err),
        //         () => console.log('completed')
        //     );

       

        // Add languages
        this._translateService.addLangs(['en', 'ru', 'kz']);

        // Set the default language
        // this._translateService.setDefaultLang('ru');
        setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('kz');
            this._translateService.setDefaultLang('ru');
        });

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(
            navigationEnglish,
            navigationKaz,
            navigationRussian
        );

        // Use a language
        this._translateService.use('ru');
        this._langService.getMenuForCurrentLang(this._translateService.currentLang);
        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    // isAdmin = false;
    /**
     * On init
     */
    ngOnInit(): void {
        this._authService.checkAdminMenu();

        const token = localStorage.getItem('token');
        const user: User = JSON.parse(localStorage.getItem('user'));

        if (token) {
            this._authService.decodedToken = this.jwtHelper.decodeToken(token);
        }

        if (user) {
            this._authService.currentUser = user;
            // this._authService.changeMemberPhoto(user.photoUrl);
        }

        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(config => {
                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                } else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // /**
    //  * Toggle sidebar open
    //  *
    //  * @param key
    //  */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
