import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  columnNum = 3;
  cols: number;
  rHeight = '450px';
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.Medium]).subscribe((largeMedia: BreakpointState) => {
      if (largeMedia.matches) {
        this.columnNum = 3;
        this.cols = 1;
        this.rHeight = '450px';
      }
    });

    this.breakpointObserver.observe(Breakpoints.Small).subscribe((smMedia: BreakpointState) => {
      if (smMedia.matches) {
        this.columnNum = 3;
        this.cols = 1;
        this.rHeight = '450px';
      }
    });

    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((xsMedia: BreakpointState) => {
      if (xsMedia.matches) {
        this.columnNum = 3;
        this.cols = 3;
        this.rHeight = '300px';
      }
    });
  }
}
