import { AuthService } from './../../../../auth/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidebar: boolean;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() toggleTheme: EventEmitter<any> = new EventEmitter();
  isDarkTheme: Observable<boolean>;
  isClicked = false;

  constructor(private themeService: ThemeService, private auth: AuthService) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }

  toggleThemeColor() {
    this.isClicked = !this.isClicked;
    this.themeService.setDarkTheme(this.isClicked);
  }

  logout() {
    this.auth.logout();
  }
}
