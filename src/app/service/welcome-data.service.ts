import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
    let thisData = this.http.get<HelloWorldBean>(
      `http://localhost:9191/hello-world/path-variable/${name}`
    );

    return thisData;
  }
}
