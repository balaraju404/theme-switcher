import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: "", redirectTo: "layout", pathMatch: "full" },
 { path: "layout", loadChildren: () => import("./layout/layout.route").then((m) => m.layoutRoutes) },
];
