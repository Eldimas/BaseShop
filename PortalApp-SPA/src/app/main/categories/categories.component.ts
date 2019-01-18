import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/_services/category.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditCatComponent } from './dialogEditCat/dialogEditCat.component';
import { Product } from '../products/product.model';


export interface DialogData {
    animal: string;
    name: string;
  }
@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    
    view: string;
    category: any;
    products: any;
    id: string;

    animal: string;
    name: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _categoryService: CategoryService,
        public dialog: MatDialog
    ) {

        this.view = 'preview';
    }

    ngOnInit(): void {

        this.view = 'preview';
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

    toggleView(): void
    {
        if ( this.view === 'preview' )
        {
            this.view = 'source';
        }
        else
        {
            this.view = 'preview';
        }
    }

    editCat(product: Product): void {
        const dialogRef = this.dialog.open(DialogEditCatComponent, {
            width: '550px',
            height: '600px',
            data: product
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result.length > 0) {
            product.title = result;
            }
          });
    }
}
