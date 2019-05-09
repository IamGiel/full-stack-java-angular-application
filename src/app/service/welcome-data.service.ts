import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class HelloWorldBean {
  constructor(public message: string) {}
}

@Injectable({
  providedIn: "root"
})
export class WelcomeDataService {
  constructor(private http: HttpClient) {}

  executeHelloWorldBeanService() {
    console.log("execute bean service");
    let thisData = this.http.get<HelloWorldBean>(
      "http://localhost:9191/hello-world-bean"
    );

    return thisData;
  }

  executeHelloPathName(name) {
    console.log("execute path name");
    let basicAuthHeaderString = this.basicAuthHeader();
    let the_Header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    console.log("header " + the_Header);
    let thisData = this.http.get<HelloWorldBean>(
      `http://localhost:9191/hello-world/path-variable/${name}`,
      { headers: the_Header }
    );

    return thisData;
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
