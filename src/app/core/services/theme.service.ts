import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private DARKTHEME: Subject<boolean> = new Subject<boolean>();
  isDarkTheme = this.DARKTHEME.asObservable();

  setDarkTheme(isDarkTheme: boolean) {
    this.DARKTHEME.next(isDarkTheme);
  }
}
