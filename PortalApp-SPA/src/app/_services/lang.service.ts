import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { createHttpObservable } from 'app/utils/util';
import { NavigService } from './navig.service';
import { Navig } from 'app/_models/navig';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Injectable({
    providedIn: 'root'
})
export class LangService {
    baseUrl = environment.apiUrl;
    navigs: Navig[] = [];

    constructor(
        private _navigService: NavigService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    getMenuForCurrentLang(lang: string): any {
        // return createHttpObservable(
        //     this.baseUrl + 'region/GetRegionsForSelect'
        // );
        // alert(lang);
        
        this._fuseNavigationService.unregister('navig');

        const http$ = this._navigService.getNavig(lang);
        http$.subscribe(
            navigs => {
                // console.log('navig: ', navigs);
                // this.navigs = navigs;

                navigs.forEach(navig => {

                    const nav = new Navig(navig);
                    this.navigs.push(nav);
                });

                // console.log('last navig: ', this.navigs);

                // // Register the new navigation
                this._fuseNavigationService.register('navig', navigs);

                // // Set the current navigation
                this._fuseNavigationService.setCurrentNavigation('navig');
            },
            err => console.log(err),
            () => console.log('completed')
        );
    }
}
