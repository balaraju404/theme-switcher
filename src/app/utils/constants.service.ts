import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class Constants {

 static readonly LS_SELECTED_THEME = "selected_theme"
 static readonly LS_USER_THEMES = "user_themes"
}
