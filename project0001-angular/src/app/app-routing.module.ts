import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permisionGuard } from '../../src/lib/guards/permision.guard'

const routes: Routes = [
  { path: "",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
    pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "todo",
    canActivate: [permisionGuard],
    loadChildren: () =>
      import("./small-features/todo/todo.module").then((m) => m.TodoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
