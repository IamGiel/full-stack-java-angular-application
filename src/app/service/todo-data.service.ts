import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { todo } from "../list-to-dos/todo";
import { WelcomeDataService } from "./welcome-data.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

let username = "user";
let password = "password";

const headers = new HttpHeaders()
  .set("Content-Type", "application/json")
  //.set("Accept", "text/plain")
  .set("Authorization", "Basic " + window.btoa(username + ":" + password));

@Injectable({
  providedIn: "root"
})
export class TodoDataService {
  constructor(
    private welcomeDataService: WelcomeDataService,
    private http: HttpClient
  ) {}

  retrieveAllTodos(Gel) {
    console.log("get all todo ");
    console.log(headers);

    let thisData = this.http.get<todo[]>(
      ` http://localhost:9191/users/${Gel}/all-todos`,
      { headers }
    );

    return thisData;
  }

  getSingleTodoItem(Gel, id) {
    console.log("get single todo ");
    let thisData = this.http.get<todo[]>(
      ` http://localhost:9191/users/${Gel}/todo/${id}`
    );

    return thisData;
  }

  deleteItemFromList(Gel, id) {
    console.log("delete a todo ");
    let thisData = this.http.delete<todo[]>(
      `http://localhost:9191/users/${Gel}/todo/${id}`
    );

    return thisData;
  }
  // /users/{user}/todo/{id}
  updateAnItem(Gel, id, body: any) {
    console.log("update to do ");
    let thisData = this.http.put(
      ` http://localhost:9191/users/${Gel}/todo/${id}`,
      body
    );

    return thisData;
  }
  saveNewList(Gel, body: todo) {
    console.log("saving a new todo");
    let thisData = this.http.post<todo[]>(
      `http://localhost:9191/users/${Gel}/todo`,
      body,
      httpOptions
    );
    return thisData;
  }
}
