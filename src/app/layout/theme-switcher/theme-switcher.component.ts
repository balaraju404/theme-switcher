import { Component } from '@angular/core';
import { UtilService } from '../../utils/util.service';
import { Constants } from '../../utils/constants.service';
import { LSManager } from '../../utils/db-manager.service';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-theme-switcher',
 imports: [CommonModule],
 templateUrl: './theme-switcher.component.html',
 styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
 allThemesList: any = []
 themesList: any = [
  {
   "name": "primary",
   "color": "#007bff",
   "clr-light": "#e6e6fa",
   "clr-dark": "#2e4053",
   "clr-light-2": "#5a9bd5",
   "clr-dark-2": "#1c2632"
  },
  {
   "name": "secondary",
   "color": "#6c757d",
   "clr-light": "#f8f9fa",
   "clr-dark": "#343a40",
   "clr-light-2": "#b0b8bc",
   "clr-dark-2": "#1c2023"
  },
  {
   "name": "tertiary",
   "color": "#28a745",
   "clr-light": "#f8f9fa",
   "clr-dark": "#343a40",
   "clr-light-2": "#6ccf7d",
   "clr-dark-2": "#1b2d1a"
  },
  {
   "name": "quaternary",
   "color": "#ff5733",
   "clr-light": "#fbe4d5",
   "clr-dark": "#c84e3b",
   "clr-light-2": "#f5b0a2",
   "clr-dark-2": "#9b2c19"
  },
  {
   "name": "quinary",
   "color": "#ff9800",
   "clr-light": "#ffe0b2",
   "clr-dark": "#e65100",
   "clr-light-2": "#ffcc80",
   "clr-dark-2": "#c62e00"
  },
  {
   "name": "senary",
   "color": "#9c27b0",
   "clr-light": "#f8bbd0",
   "clr-dark": "#7b1fa2",
   "clr-light-2": "#ec7ed0",
   "clr-dark-2": "#6a0080"
  }
 ];

 showThemes: boolean = false
 selectedTheme: any = {}
 ngOnInit() {
  UtilService.newThemeAddedSubject.subscribe(() => {
   const userThemes = LSManager.getData(Constants.LS_USER_THEMES) || [];
   this.allThemesList = [...this.themesList, ...userThemes];
  })
  const userThemes = LSManager.getData(Constants.LS_USER_THEMES) || [];
  this.allThemesList = [...this.themesList, ...userThemes];
  this.selectedTheme = LSManager.getData(Constants.LS_SELECTED_THEME) || this.themesList[0];
  UtilService.updateTheme(this.selectedTheme)
 }
 changeTheme(theme: any) {
  this.selectedTheme = theme
  LSManager.addData(Constants.LS_SELECTED_THEME, theme)
  UtilService.updateTheme(theme)
 }
}
