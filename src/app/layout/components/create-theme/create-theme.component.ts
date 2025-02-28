import { Component } from '@angular/core';
import { ColorPickerComponent, ColorPickerModel, TextFieldComponent, TextfieldModel, CardModal, CardComponent, BgColor } from '@balaraju404/custom-components';
import { LSManager } from '../../../utils/db-manager.service';
import { Constants } from '../../../utils/constants.service';
import { UtilService } from '../../../utils/util.service';

@Component({
 selector: 'app-create-theme',
 imports: [ColorPickerComponent, TextFieldComponent, CardComponent],
 templateUrl: './create-theme.component.html',
 styleUrl: './create-theme.component.scss',
})
export class CreateThemeComponent {
 card_mdl!: CardModal
 cp_mdl_clr!: ColorPickerModel
 tf_mdl_1!: TextfieldModel
 tf_mdl_2!: TextfieldModel
 tf_mdl_3!: TextfieldModel
 tf_mdl_4!: TextfieldModel
 tf_mdl_5!: TextfieldModel
 ngOnInit() {
  this.setupFields()
 }
 setupFields() {
  this.card_mdl = new CardModal("Create Theme", BgColor.Default, true)

  this.cp_mdl_clr = new ColorPickerModel(1, "Color");

  this.tf_mdl_1 = new TextfieldModel(2, "Color");
  this.tf_mdl_1.isDisabled = true

  this.tf_mdl_2 = new TextfieldModel(3, "Color light");
  this.tf_mdl_2.isDisabled = true

  this.tf_mdl_3 = new TextfieldModel(4, "Color Dark");
  this.tf_mdl_3.isDisabled = true

  this.tf_mdl_4 = new TextfieldModel(5, "Color Light 2");
  this.tf_mdl_4.isDisabled = true

  this.tf_mdl_5 = new TextfieldModel(6, "Color Dark 2");
  this.tf_mdl_5.isDisabled = true
 }
 eventHandler(event: any) {
  const tag = event["tag"] || 0
  switch (tag) {
   case 1: {
    const color = event.selectedValue
    this.tf_mdl_1.selectedValue = color
    this.tf_mdl_2.selectedValue = this.lighten(color, 0.2)
    this.tf_mdl_3.selectedValue = this.darken(color, 0.2)
    this.tf_mdl_4.selectedValue = this.lighten(color, 0.4)
    this.tf_mdl_5.selectedValue = this.darken(color, 0.4)
    break;
   }
   case 2:
    break;
  }
 }
 addToLs() {
  const userThemes = LSManager.getData(Constants.LS_USER_THEMES) || []
  const newTheme = {
   "name": "custom_" + (userThemes.length + 1),
   "color": this.tf_mdl_1.selectedValue,
   "clr-light": this.tf_mdl_2.selectedValue,
   "clr-dark": this.tf_mdl_3.selectedValue,
   "clr-light-2": this.tf_mdl_4.selectedValue,
   "clr-dark-2": this.tf_mdl_5.selectedValue
  }
  userThemes.push(newTheme)
  LSManager.addData(Constants.LS_USER_THEMES, userThemes)
  alert("New Theme Added")
  UtilService.newThemeAddedSubject.next(true)
  this.clearForm()
 }
 clearForm() {
  this.tf_mdl_1.selectedValue = ""
  this.tf_mdl_2.selectedValue = ""
  this.tf_mdl_3.selectedValue = ""
  this.tf_mdl_4.selectedValue = ""
  this.tf_mdl_5.selectedValue = ""
 }
 lighten(hex: string, percent: number) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.min(255, Math.round(r + (255 - r) * percent));
  g = Math.min(255, Math.round(g + (255 - g) * percent));
  b = Math.min(255, Math.round(b + (255 - b) * percent));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
 }
 darken(hex: string, percent: number) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.max(0, Math.round(r - r * percent));
  g = Math.max(0, Math.round(g - g * percent));
  b = Math.max(0, Math.round(b - b * percent));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
 }
}
