import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/_services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    category: any;
    products: any;
    id: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
           this.id = params.id;

            this._categoryService.getCategory('ru', this.id).subscribe(res => {
                this.category = res;
            });

            this._categoryService.getProductsByCategoryId('ru', this.id).subscribe(res => {
              this.products = res;
          });
        });
    }
}
