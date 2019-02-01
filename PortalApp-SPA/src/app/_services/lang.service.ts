import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { createHttpObservable } from 'app/utils/util';
import { NavigService } from './navig.service';
import { Navig } from 'app/_models/navig';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { Category } from 'app/_models/category';
import { CategoryService } from './category.service';

@Injectable({
    providedIn: 'root'
})
export class LangService {
    baseUrl = environment.apiUrl;
    navigs: Navig[] = [];
    categories: Category[] = [];

    constructor(
        private _navigService: NavigService,
        private _categoryService: CategoryService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    getMenuForCurrentLang(lang: string): any {
        // return createHttpObservable(
        //     this.baseUrl + 'region/GetRegionsForSelect'
        // );
        // alert(lang);

        this.navigs = [];

        // this._fuseNavigationService.unregister('navig');

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
                // this._fuseNavigationService.register('navig', navigs);

                // // Set the current navigation
                // this._fuseNavigationService.setCurrentNavigation('navig');

                this._fuseNavigationService.updateNavigationItem('catalog', {
                    type: 'collapsable',
                    children: this.navigs
                });
            },
            err => console.log(err),
            () => console.log('completed')
        );
    }

    getCategoryForCurrentLang(lang: string): any {
        // return createHttpObservable(
        //     this.baseUrl + 'region/GetRegionsForSelect'
        // );
        // alert(lang);

        this._fuseNavigationService.unregister('navig');

        const http$ = this._categoryService.getCategories(lang);
        http$.subscribe(
            categories => {
                // console.log('navig: ', navigs);
                // this.navigs = navigs;
                this.categories = [];

                categories.forEach(category => {
                    const cat = new Category(category);
                    this.categories.push(cat);
                });

                // const jsonCat = JSON.stringify(this.categories);
                // this._fuseNavigationService.updateNavigationItem('catalog', {
                //     type: 'collapsable',
                //     url: null,
                //     children: []
                // });
                

                this._fuseNavigationService.updateNavigationItem('catalog', {
                    type: 'collapsable',
                    url: null,
                    children: this.categories
                });
            },
            err => console.log(err),
            () => console.log('completed')
        );

    }
}
