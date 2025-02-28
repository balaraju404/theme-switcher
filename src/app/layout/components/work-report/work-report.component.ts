import { Component } from '@angular/core';
import { BgColor, ButtonComponent, ButtonModel, CardComponent, CardModal, DateComponent, DateHelper, DateModel, TextAreaComponent, TextAreaModel, TextFieldComponent, TextfieldModel } from '@balaraju404/custom-components';
import { LSManager } from '../../../utils/db-manager.service';
import { Constants } from '../../../utils/constants.service';
import ExcelJS from 'exceljs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
 selector: 'app-work-report',
 imports: [TextFieldComponent, CardComponent, DateComponent, ButtonComponent, TextAreaComponent],
 templateUrl: './work-report.component.html',
 styleUrl: './work-report.component.scss'
})
export class WorkReportComponent {
 icon: string = "assets/images/icon.png"
 data: any = []
 card_mdl!: CardModal
 tf_mdl_emp_name!: TextfieldModel
 tf_mdl_company_name!: TextfieldModel
 dt_mdl_date!: DateModel
 tf_mdl_work_title!: TextfieldModel
 tf_mdl_work_status!: TextfieldModel
 ta_mdl_comments!: TextAreaModel
 btn_mdl_save!: ButtonModel
 btn_mdl_generate_excel!: ButtonModel
 constructor(private readonly http: HttpClient) { }
 ngOnInit() {
  this.data = LSManager.getData(Constants.LS_SELECTED_USER_REPORTS) || []
  this.setupFields()
 }
 setupFields() {
  this.card_mdl = new CardModal("Work Report", BgColor.Default, true)

  this.tf_mdl_emp_name = new TextfieldModel(1, "Employee Name");

  this.tf_mdl_company_name = new TextfieldModel(2, "Company Name");

  this.dt_mdl_date = new DateModel(3, "Date")
  this.dt_mdl_date.selectedValue = DateHelper.getDMY()

  this.tf_mdl_work_title = new TextfieldModel(4, "Work Title");

  this.tf_mdl_work_status = new TextfieldModel(5, "Work Status");

  this.ta_mdl_comments = new TextAreaModel(6, "Comments");

  this.btn_mdl_save = new ButtonModel(7, "Save")

  this.btn_mdl_generate_excel = new ButtonModel(8, "Generate Excel")
 }
 eventHandler(event: any) {
  const tag = event["tag"] || 0
  switch (tag) {
   case 1:
    break;
   case 2:
    break;
   case 7:
    console.log(this.getParams());
    this.saveRecord()
    break;
   case 8:
    console.log(this.getParams());
    this.generateExcel()
    break;
  }
 }
 saveRecord() {
  const params = this.getParams()
  this.data.push(params)
  LSManager.addData(Constants.LS_SELECTED_USER_REPORTS, this.data)
  this.clearForm()
 }
 generateExcel() {
  let msg = ""
  if (this.tf_mdl_emp_name.selectedValue == "") {
   msg = "Employee Name is required"
  } else if (this.tf_mdl_company_name.selectedValue == "") {
   msg = "Company Name is required"
  } else if (this.data.length == 0) {
   msg = "No data to generate excel"
  }
  if (msg != "") return alert(msg)

  let record = ``;
  this.data.forEach((obj: any, i: number) => {
   let data = `
   <tr>
    <td>${i + 1}</td>
    <td>${obj['date']}</td>
    <td colspan="2">${obj['work_title']}</td>
    <td>${obj['work_status']}</td>
    <td colspan="3">${obj['comments']}</td>
   </tr>`;
   record = record + data;
  });
  let content = `
  <table width="100%" border="1" cellspacing="0" cellpadding="0" align="center" >
   <tbody>
    <tr>
     <td class="tableBorder">
      <table width="100%" border="1" cellspacing="1" cellpadding="0">
       <tbody>
        <tr>
         <td colspan="2" rowspan="3"><img src="${this.icon}" alt=""></td>
         <td colspan="6"><b> ${this.tf_mdl_company_name.selectedValue || ''} </b></td>
        </tr>
        <tr>
         <td colspan="6"><b> Daily Work Report</b></td>
        </tr>
        <tr>
         <td colspan="6"><b> Employee Name: ${this.tf_mdl_emp_name.selectedValue || ''}</b></td>
        </tr>
        <tr height="30">
         <th>S No</th>
         <th>Date</th>
         <th colspan="2">Work Title</th>
         <th>Work Status</th>
         <th colspan="3">Comments</th>
        </tr>
        ${record}
       </tbody>
      </table>
     </td>
    </tr>
   </tbody>
  </table> `;
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  link.download = `work_report_${formattedDate}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
 }

 // generateExcel() {
 //  if (this.data.length == 0) {
 //   return alert('No data to download');
 //  }

 //  // Convert the image to base64 and proceed once it's available
 //  this.imageToBase64(this.icon).subscribe((base64Image: string) => {
 //   const workbook = new ExcelJS.Workbook();
 //   const worksheet = workbook.addWorksheet('Daily Work Report');

 //   // Add image to the Excel sheet using base64 data
 //   const imageId = workbook.addImage({
 //    base64: base64Image, // Image as base64
 //    extension: 'png', // Image format, e.g., 'png' or 'jpeg'
 //   });

 //   // Insert the image at the top-left corner and merge cells for the title
 //   worksheet.addImage(imageId, {
 //    tl: { col: 0, row: 0 }, // Top-left corner of the worksheet
 //    ext: { width: 100, height: 100 } // Adjust size of image
 //   });

 //   // First title row: Merging for Image and Title
 //   worksheet.mergeCells('B1:H1'); // Merging cells from B1 to H1 for company name
   // worksheet.getCell('B1').value = this.tf_mdl_company_name.selectedValue;
 //   worksheet.getCell('B1').font = { bold: true, size: 14 };

 //   // Second title row: Merging cells for 'Daily Work Report'
 //   worksheet.mergeCells('B2:H2'); // Merging cells from B2 to H2 for 'Daily Work Report'
 //   worksheet.getCell('B2').value = 'Daily Work Report';
 //   worksheet.getCell('B2').font = { bold: true, size: 12 };

 //   // Third title row: Merging cells for 'Employee Name'
 //   worksheet.mergeCells('B3:H3'); // Merging cells from B3 to H3 for 'Employee Name'
 //   worksheet.getCell('B3').value = `Employee Name: Balaraju Gandham`;
 //   worksheet.getCell('B3').font = { bold: true, size: 12 };

 //   // Add a row for spacing
 //   worksheet.addRow([]);

 //   // Fourth row: Header Row for Data Table
 //   worksheet.addRow(['S No', 'Date', 'Work Title', 'Work Status', 'Comments']);

 //   // Add data rows
 //   this.data.forEach((obj: any, i: number) => {
 //    worksheet.addRow([
 //     i + 1,
 //     obj['date'],
 //     obj['work_title'],
 //     obj['work_status'],
 //     obj['comments'],
 //    ]);
 //   });

 //   // Prepare the Excel file and trigger the download
 //   const today = new Date();
 //   const day = String(today.getDate()).padStart(2, '0');
 //   const month = String(today.getMonth() + 1).padStart(2, '0');
 //   const year = today.getFullYear();
 //   const formattedDate = `${day}-${month}-${year}`;

 //   workbook.xlsx.writeBuffer().then((buffer) => {
 //    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 //    const link = document.createElement('a');
 //    link.href = URL.createObjectURL(blob);
 //    link.download = `work_report_${formattedDate}.xlsx`;
 //    document.body.appendChild(link);
 //    link.click();
 //    document.body.removeChild(link);
 //   });
 //  });
 // }


 // Method to convert image to base64 string (asynchronous)
 imageToBase64(imagePath: string): Observable<string> {
  return new Observable((observer) => {
   this.http.get(imagePath, { responseType: 'blob' }).subscribe((response: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
     observer.next(reader.result as string);  // Base64 string
     observer.complete();
    };
    reader.readAsDataURL(response); // Convert blob to base64
   });
  });
 }

 getParams() {
  return {
   "employee_name": this.tf_mdl_emp_name.selectedValue,
   "company_name": this.tf_mdl_company_name.selectedValue,
   "date": this.dt_mdl_date.selectedValue,
   "work_title": this.tf_mdl_work_title.selectedValue,
   "work_status": this.tf_mdl_work_status.selectedValue,
   "comments": this.ta_mdl_comments.selectedValue
  }
 }
 clearForm() {
  this.tf_mdl_emp_name.selectedValue = ""
  this.dt_mdl_date.selectedValue = ""
  this.tf_mdl_work_title.selectedValue = ""
  this.tf_mdl_work_status.selectedValue = ""
  this.ta_mdl_comments.selectedValue = ""
 }
}
