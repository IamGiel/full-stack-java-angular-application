import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { todo } from "../list-to-dos/todo";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retrieveAllTodos(Gel) {
    console.log("retrieveAllTodos ");
    let thisData = this.http.get<todo[]>(
      ` http://localhost:9191/users/${Gel}/all-todos`
    );

    return thisData;
  }

  deleteItemFromList(Gel, id) {
    console.log("retrieveAllTodos ");
    let thisData = this.http.delete<todo[]>(
      `http://localhost:9191/users/${Gel}/todo/${id}`
    );

    return thisData;
  }
  saveNewList(Gel, body: todo) {
    console.log("saving a new list");
    let thisData = this.http.post<todo[]>(
      `http://localhost:9191/users/${Gel}/todo`,
      body,
      httpOptions
    );
    return thisData;
  }
}
