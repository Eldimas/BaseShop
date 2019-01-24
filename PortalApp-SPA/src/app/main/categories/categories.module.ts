import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import {
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSortModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTreeModule
} from '@angular/material';
import { FuseHighlightModule, FuseWidgetModule } from '@fuse/components';
import { DialogEditCatComponent } from './dialogEditCat/dialogEditCat.component';
import { CategoriesEditComponent, ChecklistDatabaseTwo } from './categoriesEdit/categoriesEdit.component';
import { EditCategoriesComponent } from '../admin/menu/edit-categories/edit-categories.component';

const routes = [
    { path: 'category/:id', component: CategoriesComponent },
    { path: 'category', component: CategoriesComponent }
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
        FuseHighlightModule,

        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSortModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatTreeModule
    ],
    declarations: [
        CategoriesComponent,
        DialogEditCatComponent,
        CategoriesEditComponent
        
    ],
    providers: [
      ChecklistDatabaseTwo
    ],
    exports: [
        CategoriesComponent,
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
        FuseHighlightModule,

        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSortModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatTreeModule
    ],
    entryComponents: [DialogEditCatComponent]
})
export class CategoriesModule {}
