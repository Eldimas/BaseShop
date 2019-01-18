import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatTabsModule, MatMenuModule } from '@angular/material';
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
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
        TranslateModule,
        FuseSharedModule
  ],
  declarations: [ProductsComponent],
  exports: [
    ProductsComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    MatTabsModule
  ]
})
export class ProductsModule { }
