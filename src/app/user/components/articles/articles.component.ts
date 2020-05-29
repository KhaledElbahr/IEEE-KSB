import { Article } from './../../../core/models/article';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder } from '@angular/forms';
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
  years = [
    { id: 1, year: '2018' },
    { id: 2, year: '2019' },
    { id: 3, year: '2020' }
  ];
  articles: Article[];
  selectedYear: number;
  allArticles = -1;
  columnNum = 3;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver, private fb: FormBuilder) {
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
    this.getArticles();
  }

  onSelectYear() {
    console.log(typeof (this.selectedYear));
    if (this.selectedYear === -1) {
      this.getArticles();
    } else {
      this.userService.getArticlesByYear(this.selectedYear).subscribe(
        data => this.articles = data,
        err => console.log(err)
      );
    }
  }

  getArticles() {
    this.userService.getArticles().subscribe(
      (data: Article[]) => {
        console.log(data);
        this.articles = data;
      },
      err => console.log(err)
    );
  }
}
