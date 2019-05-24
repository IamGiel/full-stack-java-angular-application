import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { BasicAuthenticationService } from "../basic-authentication.service";

@Injectable({
  providedIn: "root"
})

// we are intercepting the request
// adding the authorization header
// then we are sending it to the next Http handler
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private privateAuthService: BasicAuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let username: "user";
    // let password: "password";
    // let basicAuthHeaderString =
    //   "Basic " + window.btoa(username + ":" + password); //encode byte 64 encoding window.btoa
    // console.log("header string " + basicAuthHeaderString);

    let basicAuthHeaderString = this.privateAuthService.getAuthenticatedToken();
    let user = this.privateAuthService.getAuthenticatedUser();

    if (basicAuthHeaderString && user) {
      req = req.clone({
        setHeaders: {
          Authoriation: basicAuthHeaderString
          //   "Content-Type": "application/json"
        }
      });
    }

    console.log("http interceptor header " + JSON.stringify(req));

    return next.handle(req);
  }
}
