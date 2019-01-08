import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  form: FormGroup;
  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  // getErrorMessage() {
  //   return this.form.value['email'].hasError('required') ? 'You must enter a value' :
  //       this.form.value['email'].hasError('email') ? 'Not a valid email' :
  //           '';
  // }

  onSubmit(): void {
    console.log('Submitted: ', this.form);
    
  }

}
