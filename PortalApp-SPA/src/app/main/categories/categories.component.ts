import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/_services/category.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditCatComponent } from './dialogEditCat/dialogEditCat.component';
import { Product } from '../products/product.model';
import { Category } from 'app/_models/category';


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
    category: Category;
    products: Product[];
    id: string;
    categoryTitle: string;

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
                this.categoryTitle = this.category.title;
                // console.log('Categoryy: ', res);
                
            });

            this._categoryService.getProductsByCategoryId('ru', this.id).subscribe(res => {
            //   this.products = res;
            //   console.log('Productss: ', res);

            this.products = [];

            res.forEach(prod => {
                this.products.push(new Product(prod));
            });

            console.log('Productssss: ', this.products);
            
              
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

    editProduct(product: Product, isNew: boolean): void {
        const dialogRef = this.dialog.open(DialogEditCatComponent, {
            width: '750px',
            height: '700px',
            data: product
          });
      
          dialogRef.afterClosed().subscribe(prod => {
            console.log('The dialog was closed');
            console.log('resulttt: ', prod);
          
            if (prod !== null && prod !== undefined) {
                product.title = prod.title;
            }

          });
    }

    addProduct(): void {
        const uuidv1 = require('uuid/v1');

        const prod = new Product(
        {
            id: uuidv1(),
            title: 'new', 
            price: 0.0,
            categories: [
                this.category
            ]
        });
        
        this.editProduct(prod, true);
       

    }
}
