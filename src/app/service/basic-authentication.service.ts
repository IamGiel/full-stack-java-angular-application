import { Injectable } from "@angular/core";
import { WelcomeDataService, HelloWorldBean } from "./welcome-data.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BasicAuthenticationService {
  constructor(
    private http: HttpClient,
    private welcomeData: WelcomeDataService
  ) {}

  // `authenticate(user, password) {
  //   // console.log("before .... " + this.isUserLoggedIn());
  //   if (user === "Gel" && password === "password") {
  //     sessionStorage.setItem("authenticateUser", user);
  //     // console.log("after .... " + this.isUserLoggedIn());
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }`

  // utility methods
  getAuthenticatedUser() {
    return sessionStorage.getItem("authenticateUser");
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser) {
      return sessionStorage.getItem("token");
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticateUser");

    if (user === null) {
      //user not logged in
      return false;
    } else {
      return true;
    }
  }

  // when logged out, clear storage.
  userLoggedOut() {
    sessionStorage.clear();
  }

  executeBasicAuthenticationService(username, password) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Basic " + window.btoa(username + ":" + password));
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password); //encode byte 64 encoding window.btoa

    return this.http
      .get<AuthenticationBean>(`http://localhost:9191/basicAuth`, {
        headers
      })
      .pipe(
        map(data => {
          sessionStorage.setItem("authenticateUser", username);
          sessionStorage.setItem("token", basicAuthHeaderString);
          console.log("basicAuthHeaderString ", basicAuthHeaderString);
          return data;
        })
      );
  }

  // basicAuthHeader() {
  //   let username: "user";
  //   let password: "password";
  //   let basicAuthHeaderString =
  //     "Basic " + window.btoa(username + ":" + password); //encode byte 64 encoding window.btoa
  //   console.log("header string " + basicAuthHeaderString);
  //   return basicAuthHeaderString;
  // }
}

export class AuthenticationBean {
  constructor(public message: String) {}
}
