import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';


const routes = [
  {
    path: 'products', 
    component: ProductsComponent
  }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
        TranslateModule,
        FuseSharedModule
  ],
  declarations: [ProductsComponent],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
