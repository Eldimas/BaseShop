import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatIconModule, MatTabsModule, MatMenuModule, 
  MatSelectModule, MatSlideToggleModule, MatDialogModule, MatInputModule } from '@angular/material';
import { FuseHighlightModule } from '@fuse/components';
import { DialogEditCatComponent } from './dialogEditCat/dialogEditCat.component';

const routes = [
  { path: 'category/:id', component: CategoriesComponent},
  { path: 'category', component: CategoriesComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    TranslateModule,
    FuseSharedModule,
    FuseHighlightModule
  ],
  declarations: [
    CategoriesComponent,
    DialogEditCatComponent
  ],
  exports: [
    CategoriesComponent,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule
  ],
  entryComponents: [DialogEditCatComponent]
})
export class CategoriesModule { }
