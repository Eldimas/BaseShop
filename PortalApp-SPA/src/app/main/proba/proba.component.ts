import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { MatButton } from '@angular/material';
import { ProbaListDatabase } from './probaListDatabase';
import { ProbaCat } from './probaCat.model';

@Component({
    selector: 'app-proba',
    templateUrl: './proba.component.html',
    styleUrls: ['./proba.component.scss'],
    providers: [ProbaListDatabase]
})
export class ProbaComponent implements OnInit {
    @ViewChild('btnclick') btnClick: any;

    subject$ = new BehaviorSubject<ProbaCat[]>([]);
    cats_data: ProbaCat[] = [
        {
            id: '1',
            title: 'title 1',
            children: [
                {
                    id: '1_1',
                    title: 'title 1_1',
                    children: []
                }
            ]
        }
    ];

    constructor() {}

    ngOnInit(): void {
        // subject$.next('Hello');

        this.initialize();

        const click$ = fromEvent(
            this.btnClick._elementRef.nativeElement,
            'click'
        );

        click$.subscribe(evt => {
            console.log(evt);
            // subject$.next('Click');
        });
    }

    initialize(): any {
        const data = this.buildFileTree(this.cats_data, 0);
        this.subject$.next(data);
    }

    buildFileTree(obj: ProbaCat[], level: number): ProbaCat[] {
        return Object.keys(obj).reduce<ProbaCat[]>((accumulator, key) => {
            const value = obj[key];
            const node = new ProbaCat();
            node.id = value.id;
            node.title = value.title;

            if (value != null) {
                if (
                    typeof value === 'object' &&
                    value.children != null &&
                    value.children.length > 0
                ) {
                    node.children = this.buildFileTree(
                        value.children,
                        level + 1
                    );
                } else {
                    node.title = value.title;
                }
            }

            const acc = accumulator.concat(node);
            return accumulator.concat(node);
        }, []);

       
    }
}
