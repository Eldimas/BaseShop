import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
{
  path: 'home',
  component: HomeComponent
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
  ],
  declarations: [ HomeComponent ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
