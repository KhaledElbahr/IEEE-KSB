import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  slides = [
    {id: 1, image: '.../../../assets/images/slider-img-2.jpg'},
    {id: 2, image: '../../../assets/images/slider-img-2.jpg'},
    {id: 3, image: '../../../assets/images/slider-img-2.jpg'}
  ];
  columnNum = 3;
  imgCols: number;
  textCols: number;
  colNumArticles = 2;
  txtColsArticles: number;
  imgColsArticles: number;
  colNumVln = 4;
  imgColsVln: number;

  constructor(private breakpointObserver: BreakpointObserver) {
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
}
