import { Component, OnInit } from '@angular/core';

import { locale as english } from './i18n/en';
import { locale as kazakh } from './i18n/kz';
import { locale as russian } from './i18n/ru';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) 
  { 
    this._fuseTranslationLoaderService.loadTranslations(english, kazakh, russian);
  }

  ngOnInit(): void {
  }

}
