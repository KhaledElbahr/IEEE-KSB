import { map } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';
import { Article } from './../../../core/models/article';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Volunteer } from 'src/app/core/models/volunteer';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  slides = [
    {id: 1, image: '../../../../assets/images/slider-img-2.jpg'},
    {id: 2, image: '../../../../assets/images/slider-img-2.jpg'},
    {id: 3, image: '../../../../assets/images/slider-img-2.jpg'}
  ];
  columnNum = 3;
  imgCols: number;
  textCols: number;
  colNumArticles = 2;
  txtColsArticles: number;
  imgColsArticles: number;
  colNumVln = 4;
  imgColsVln: number;

  articles: Article[];
  volunteers: Volunteer[];
  volunteerImage;

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.Medium]).subscribe((largeMedia: BreakpointState) => {
      if (largeMedia.matches) {
        this.columnNum = 3;
        this.imgCols = 2;
        this.textCols = 1;

        this.colNumArticles = 2;
        this.txtColsArticles = 1;
        this.imgColsArticles = 1;

        this.colNumVln = 4;
        this.imgColsVln = 1;
      }
    });

    this.breakpointObserver.observe(Breakpoints.Small).subscribe((smMedia: BreakpointState) => {
      if (smMedia.matches) {
        this.columnNum = 5;
        this.imgCols = 3;
        this.textCols = 2;

        this.colNumArticles = 2;
        this.txtColsArticles = 1;
        this.imgColsArticles = 1;

        this.colNumVln = 4;
        this.imgColsVln = 2;
      }
    });

    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((xsMedia: BreakpointState) => {
      if (xsMedia.matches) {
        this.columnNum = 2;
        this.imgCols = 2;
        this.textCols = 2;

        this.colNumArticles = 2;
        this.txtColsArticles = 2;
        this.imgColsArticles = 0;

        this.colNumVln = 4;
        this.imgColsVln = 4;
      }
    });
  }

  ngOnInit(): void {
    this.userService.getLastArticles().subscribe(
      (data: Article[]) => {
        this.articles = data;
      },
      err => console.log(err)
    );

    this.userService.getHomeVolunteers().subscribe(
      (data: Volunteer[]) => {
        this.volunteers = data;
        map((v: Volunteer) => this.volunteerImage = v.committee);
      },
      err => console.log(err)
    );
  }
}
