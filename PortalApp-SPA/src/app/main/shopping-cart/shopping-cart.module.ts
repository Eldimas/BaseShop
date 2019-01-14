import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatButtonModule } from '@angular/material';

const routes = [
{
  path: 'shopping-cart', 
  component: ShoppingCartComponent
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
        TranslateModule,
        FuseSharedModule
  ],
  declarations: [ShoppingCartComponent],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
