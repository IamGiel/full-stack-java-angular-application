import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { todo } from "../list-to-dos/todo";
import { WelcomeDataService } from "./welcome-data.service";
import { JPA_URL } from "../app.constants";
import { API_URL } from "../app.constants";
import { BasicAuthenticationService } from "./basic-authentication.service";

@Injectable({
  providedIn: "root"
})
export class TodoDataService {
  constructor(
    private welcomeDataService: WelcomeDataService,
    private basicAuth: BasicAuthenticationService,
    private http: HttpClient
  ) {}

  token = this.basicAuth.getAuthenticatedToken();

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `${this.token}`
    })
  };

  retrieveAllTodos(Gel) {
    console.log("get all todo ");
    console.log("this httpOptions ", this.httpOptions);
    // console.log(headers);

    let thisData = this.http.get<todo[]>(
      `${API_URL}/users/${Gel}/all-todos`,
      this.httpOptions
    );
    console.log("/all-todos ", thisData);

    return thisData;
  }

  getSingleTodoItem(Gel, id) {
    console.log("get single todo ");
    let thisData = this.http.get<todo[]>(
      `${API_URL}/users/${Gel}/todo/${id}`,
      this.httpOptions
    );

    return thisData;
  }

  deleteItemFromList(Gel, id) {
    console.log("delete a todo ");
    let thisData = this.http.delete<todo[]>(
      `${API_URL}/users/${Gel}/todo/${id}`
    );

    return thisData;
  }
  // /users/{user}/todo/{id}
  updateAnItem(Gel, id, body: any) {
    console.log("update to do ");
    let thisData = this.http.put(` ${API_URL}/users/${Gel}/todo/${id}`, body);

    return thisData;
  }
  saveNewList(Gel, body: todo) {
    console.log("saving a new todo");
    let thisData = this.http.post<todo[]>(
      `${API_URL}/users/${Gel}/todo`,
      body,
      this.httpOptions
    );
    return thisData;
  }
}
