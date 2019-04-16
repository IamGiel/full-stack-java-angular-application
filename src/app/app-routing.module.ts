import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ErrorComponent } from "./error/error.component";
import { ListToDosComponent } from "./list-to-dos/list-to-dos.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LogoutComponent } from "./logout/logout.component";
// import { HeaderComponent } from "./header/header.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "welcome/:name", component: WelcomeComponent },
  { path: "list-to-dos", component: ListToDosComponent },
  { path: "logout", component: LogoutComponent },

  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
