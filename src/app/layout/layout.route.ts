import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

export const layoutRoutes: Routes = [
 {
  path: "", component: LayoutComponent, children: [
   { path: "", redirectTo: "work-report", pathMatch: "full" },
   { path: "work-report", loadComponent: () => import("./components/work-report/work-report.component").then((m) => m.WorkReportComponent) },
   { path: "create-theme", loadComponent: () => import("./components/create-theme/create-theme.component").then((m) => m.CreateThemeComponent) }
  ]
 }
]
