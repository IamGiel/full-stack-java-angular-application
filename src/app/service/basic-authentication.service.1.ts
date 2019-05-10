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

  authenticate(user, password) {
    // console.log("before .... " + this.isUserLoggedIn());
    if (user === "Gel" && password === "password") {
      sessionStorage.setItem("authenticateUser", user);
      // console.log("after .... " + this.isUserLoggedIn());
      return true;
    } else {
      return false;
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
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password); //encode byte 64 encoding window.btoa
    let the_Header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    console.log("header " + the_Header);

    let thisData = this.http
      .get<AuthenticationBean>(`http://localhost:9191/basicAuth`, {
        headers: the_Header
      })
      .pipe(
        // this pipe method allows us to handle is the call is successful to soemthing
        // if proper response comes back - map it
        map(data => {
          // if data comes back, set username to storage and retrn data
          // whoever subscribves will get this data
          sessionStorage.setItem("AuthenticateUser", username);
          return data;
        })
      );

    return thisData;
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
