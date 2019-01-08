import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { AdminUsersService } from './admin-users/admin-users.service';
import { AdminUsersComponent } from './admin-users/admin-users.component';

import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserService } from './admin-user/admin-user.service';

const routes: Routes = [
    {
        path: 'admin-users',
        component: AdminUsersComponent,
        resolve  : {
          data: AdminUsersService
      }
    },
    {
        path     : 'admin-users/:id',
        component: AdminUserComponent,
        resolve  : {
            data: AdminUserService
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        FuseSharedModule,
        FuseWidgetModule,
        MatSnackBarModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        AdminUsersComponent,
        AdminUserComponent
    ]
})
export class AdminUsersModule {}
