import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from "./error/error.component";
import { ListToDosComponent } from "./list-to-dos/list-to-dos.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LogoutComponent } from "./logout/logout.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from "./service/http/http-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListToDosComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    LogoutComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
