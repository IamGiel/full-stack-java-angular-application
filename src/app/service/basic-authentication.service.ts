import { Injectable } from "@angular/core";
import { WelcomeDataService, HelloWorldBean } from "./welcome-data.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { API_URL } from "../app.constants";

export const AUTHENTICATED_USER = "authenticateUser";
export const TOKEN = "token";

@Injectable({
  providedIn: "root"
})
export class BasicAuthenticationService {
  constructor(
    private http: HttpClient,
    private welcomeData: WelcomeDataService
  ) {}

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser) {
      // console.log("get authenticated user ", sessionStorage.getItem(TOKEN));
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);

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

  // executeJWTAuthenticationService(username, password) {
  //   return this.http
  //     .post<AuthenticationBean>(`${API_URL}/authenticate`, {
  //       username,
  //       password
  //     })
  //     .pipe(
  //       map(data => {
  //         sessionStorage.setItem(AUTHENTICATED_USER, username);
  //         sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
  //         return data;
  //       })
  //     );
  // }

  executeBasicAuthenticationService(username, password) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Basic " + window.btoa(username + ":" + password));
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password); //encode byte 64 encoding window.btoa

    return this.http
      .get<AuthenticationBean>(`${API_URL}/basicAuth`,{headers}
      )
      .pipe( // pipe "if theres succcess data, do this... "
        map(data => { // map "stores the returned data to variabl, then do stuff with it.."
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          console.log("basicAuthHeaderString ", basicAuthHeaderString);
          return data;
        })
      );
  }

  basicAuthHeader() {
    let username: "user";
    let password: "password";
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password); //encode byte 64 encoding window.btoa
    console.log("header string " + basicAuthHeaderString);
    return basicAuthHeaderString;
  }
}

export class AuthenticationBean {
  token: any;
  constructor(public message: String) {}
}
