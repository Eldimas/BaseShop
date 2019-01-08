import { NgModule } from '@angular/core';
import { AdminUsersModule } from './users/users.module';
import { AdminMenuModule } from './menu/menu.module';


@NgModule({
  imports: [
    AdminUsersModule,
    AdminMenuModule
  ]
})
export class AdminModule { }
