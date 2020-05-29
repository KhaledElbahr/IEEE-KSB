import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  sideBarOpen = true;
  darkMode = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.isDarkTheme.subscribe(
      dark => {
        this.darkMode = dark;
        console.log(this.darkMode);
      }
    );
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
