import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { todo } from "../list-to-dos/todo";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const headers = new HttpHeaders()
  .set("Content-Type", "application/json")
  .set("Accept", "text/plain");

@Injectable({
  providedIn: "root"
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retrieveAllTodos(Gel) {
    console.log("get all todo ");
    let thisData = this.http.get<todo[]>(
      ` http://localhost:9191/users/${Gel}/all-todos`
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
