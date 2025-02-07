import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

export const layoutRoutes: Routes = [
 {
  path: "", component: LayoutComponent, children: [
  // { path: "", redirectTo: "create-theme", pathMatch: "full" },
   { path: "create-theme", loadComponent: () => import("./components/create-theme/create-theme.component").then((m) => m.CreateThemeComponent) }
  ]
 }
]
