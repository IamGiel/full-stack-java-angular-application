import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ErrorComponent } from "./error/error.component";
import { ListToDosComponent } from "./list-to-dos/list-to-dos.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LogoutComponent } from "./logout/logout.component";
import { RouteGuardsService } from "./service/route-guards.service";
// import { HeaderComponent } from "./header/header.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  {
    path: "welcome/:name",
    component: WelcomeComponent,
    canActivate: [RouteGuardsService]
  },
  {
    path: "users/:name/list-to-dos",
    component: ListToDosComponent,
    canActivate: [RouteGuardsService]
  },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [RouteGuardsService]
  },
  // {
  //   path: "welcome",
  //   component: WelcomeComponent,
  //   canActivate: [RouteGuardsService]
  // },
  // if user types wrong url paths
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
