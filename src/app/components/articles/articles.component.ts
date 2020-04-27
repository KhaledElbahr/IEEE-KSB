import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  selectYearsForm: FormGroup;
  contactForm: FormGroup;
  columnNum = 3;
  years = [
    { id: 1, value: '2018' },
    { id: 2, value: '2019' },
    { id: 3, value: '2020' }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder) {
    breakpointObserver.observe([Breakpoints.Large, Breakpoints.Medium]).subscribe((largeMedia: BreakpointState) => {
      if (largeMedia.matches) {
        this.columnNum = 3;
      }
    });

    breakpointObserver.observe(Breakpoints.Small).subscribe((smMedia: BreakpointState) => {
      if (smMedia.matches) {
        this.columnNum = 2;
      }
    });

    breakpointObserver.observe(Breakpoints.XSmall).subscribe((xsMedia: BreakpointState) => {
      if (xsMedia.matches) {
        this.columnNum = 1;
      }
    });
  }

  ngOnInit(): void {
    this.selectYearsForm = this.fb.group({
      year: ''
    });
  }

  get year() { return this.selectYearsForm.get('year'); }

  onClick() {
    window.confirm('You want leave the site?');
  }
}
