import { Component, OnInit, Output, Input } from "@angular/core";
import { TodoDataService } from "src/app/service/todo-data.service";
import { todo } from "";
import { Input } from "@angular/compiler/src/core";

@Component({
  selector: "app-add-to-lists",
  templateUrl: "./add-to-lists.component.html",
  styleUrls: ["./add-to-lists.component.css"]
})
export class AddToListsComponent implements OnInit {
  @Input() addedAlist: boolean;
  constructor(private todoService: TodoDataService) {}
  id;
  userName;
  description;
  date;
  payload: any = {};

  ngOnInit() {
    this.userName = sessionStorage.getItem("authenticateUser");
    this.todoService
      .retrieveAllTodos(this.userName)
      .subscribe(res => console.log(res));
  }

  // generateId() {
  //   this.todoService.retrieveAllTodos(this.userName).subscribe(res => {
  //     console.log(res);
  //     let test = res.map(this.payload);
  //     console.log(test);
  //   });
  // }

  generateDate(date) {
    // date = this.date;
    let isoDate = new Date(date).toISOString();
    console.log(isoDate);
    return isoDate;
  }

  saveNewList(event) {
    event.preventDefault();
    this.generateDate(this.date);
    this.addedAlist = true;

    this.payload.description = this.description;
    this.payload.setDate = this.date;
    console.log(this.date);
    this.payload.isDone = false;
    console.log("this is payload " + JSON.stringify(this.payload));
    this.todoService.saveNewList(this.userName, this.payload).subscribe(
      response => {
        console.log(response);
        this.todoService
          .retrieveAllTodos(this.userName)
          .subscribe(res => console.log(res));
      },
      error => {
        console.log(error);
      }
    );
  }
}
