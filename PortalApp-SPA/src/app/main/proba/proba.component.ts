import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { MatButton } from '@angular/material';

@Component({
  selector: 'app-proba',
  templateUrl: './proba.component.html',
  styleUrls: ['./proba.component.scss']
})
export class ProbaComponent implements OnInit {

  @ViewChild('btnclick') btnClick: any;

  constructor() { }

  ngOnInit(): void {
    const click$ = fromEvent(this.btnClick._elementRef.nativeElement, 'click');

    click$.subscribe(
      evt => console.log(evt)
      
    );
  }

}
