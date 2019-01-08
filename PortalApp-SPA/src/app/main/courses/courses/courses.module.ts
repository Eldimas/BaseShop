import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AddCourseComponent } from './add-course/add-course.component';

const routes = [
  { path: 'courses', component: CoursesComponent},
  { path: 'add-course', component: AddCourseComponent},
  { path: 'edit-course', component: EditCourseComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,

        MatTabsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
  ],
  declarations: [
    CoursesComponent,
    EditCourseComponent,
    AddCourseComponent
  ],
  exports: [
    CoursesComponent,
    EditCourseComponent,
    AddCourseComponent,

    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CoursesModule { }
