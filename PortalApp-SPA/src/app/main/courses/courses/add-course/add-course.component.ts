import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  // description: string;
  //   iconUrl: string;
  //   courseListIcon: string;
  //   longDescription: string;
  //   category: string;
  //   lessonsCount: number;
  form: FormGroup;
  baseUrl = environment.apiUrl + 'course/';

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup(
      {
        description: new FormControl(''),
        iconUrl: new FormControl(''),
        courseListIcon: new FormControl(''),
        longDescription: new FormControl(''),
        category: new FormControl('BEGINNER'),
        lessonsCount: new FormControl(0)
      }
    );
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // console.log('Submitted: ', this.form);
    const token = localStorage.getItem('token');

    const obs$ = fromPromise(
        fetch(this.baseUrl + 'addCourse/2', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(this.form.value),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            return response.json();
        })
    );
    obs$.subscribe(console.log);
  }

}
