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
  constructor(private basicAuthService: BasicAuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    console.log("basicAuthHeaderString ", basicAuthHeaderString);
    let user = this.basicAuthService.getAuthenticatedUser();
    console.log("user ", user);

    if (basicAuthHeaderString && user) {
      req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(req);
  }
}
