import { Component } from '@angular/core';
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ThemeSwitcherComponent } from "./theme-switcher/theme-switcher.component";
import { UtilService } from '../utils/util.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
 selector: 'app-layout',
 imports: [CommonModule, RouterModule, MenuComponent, FooterComponent, HeaderComponent, ThemeSwitcherComponent],
 templateUrl: './layout.component.html',
 styleUrl: './layout.component.scss'
})
export class LayoutComponent {
 curTheme: string = ""
 ngOnInit() {
  UtilService.themeChangeSubject.subscribe((theme: any) => {
   this.curTheme = theme;
  })
 }
}
