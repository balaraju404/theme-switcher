import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class UtilService {
 static readonly themeChangeSubject = new BehaviorSubject("default")
 static readonly newThemeAddedSubject = new Subject()
 static updateTheme(theme: any) {
  const { color, "clr-light": clr_light, "clr-dark": clr_dark, "clr-light-2": clr_light_2, "clr-dark-2": clr_dark_2 } = theme;
  document.documentElement.style.setProperty('--clr', color);
  document.documentElement.style.setProperty('--clr-light', clr_light);
  document.documentElement.style.setProperty('--clr-dark', clr_dark);
  document.documentElement.style.setProperty('--clr-light-2', clr_light_2);
  document.documentElement.style.setProperty('--clr-dark-2', clr_dark_2);
  UtilService.themeChangeSubject.next(theme["name"] || "default");
 }
}
