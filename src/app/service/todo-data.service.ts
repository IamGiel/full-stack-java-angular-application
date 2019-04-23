import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { todo } from "../list-to-dos/todo";

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
}
