import { UserService } from '../../../core/services/user.service';
import { Volunteer } from './../../../core/models/volunteer';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  panelOpenState = false;
  volunteers: Volunteer[];
  columnNum: number;
  cols: number;
  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // linkedin svg icon
    iconRegistry.addSvgIcon(
      'linkedin',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/linkedin-brands.svg'));
    // large Screen
    this.breakpointObserver.observe(Breakpoints.Large).subscribe((largeMedia: BreakpointState) => {
      if (largeMedia.matches) {
        this.columnNum = 4;
        this.cols = 1;
      }
    });
    // Medium Screen
    this.breakpointObserver.observe(Breakpoints.Medium).subscribe((mdMedia: BreakpointState) => {
      if (mdMedia.matches) {
        this.columnNum = 3;
        this.cols = 1;
      }
    });
    // Small Screen
    this.breakpointObserver.observe(Breakpoints.Small).subscribe((smMedia: BreakpointState) => {
      if (smMedia.matches) {
        this.columnNum = 2;
        this.cols = 1;
      }
    });
    // XSmall Screen
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((xsMedia: BreakpointState) => {
      if (xsMedia.matches) {
        this.columnNum = 1;
        this.cols = 1;
      }
    });
   }


  ngOnInit(): void {
    this.userService.getVolunteers().subscribe(
      data => {
        console.log(data);
        this.volunteers = data;
      },
      err => console.log(err)
    );
  }

}
