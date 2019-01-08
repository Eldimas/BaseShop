import { NgModule } from '@angular/core';
import { ProbaComponent } from './proba.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material';

const routes = [
  {
    path: 'proba',
    component: ProbaComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    MatButtonModule
  ],
  declarations: [ProbaComponent],
  exports: [
    ProbaComponent,

    MatButtonModule
  ]
})
export class ProbaModule { }
