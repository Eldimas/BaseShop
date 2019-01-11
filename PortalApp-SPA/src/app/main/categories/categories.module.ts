import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  { path: 'category/:id', component: CategoriesComponent},
  { path: 'category', component: CategoriesComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule
  ],
  declarations: [CategoriesComponent],
  exports: [CategoriesComponent]
})
export class CategoriesModule { }
