import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as kazakh } from './i18n/kz';
import { locale as russian } from './i18n/ru';
import { AdminService } from 'app/_services/admin.service';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements OnInit
{
   users: any;
    // /**
    //  * Constructor
    //  *
    //  * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
    //  */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _adminService: AdminService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, kazakh, russian);
    }

    ngOnInit(): void {
        this._adminService.getUsersWithRoles().subscribe((users: any) => {
            this.users = users;
          }, error => {
            console.log(error);
          });
        
    }
}
