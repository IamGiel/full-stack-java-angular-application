import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Location } from "@angular/common";
import { todo } from "./todo";
import { TodoDataService } from "../service/todo-data.service";
import { routerNgProbeToken } from "@angular/router/src/router_module";

@Component({
  selector: "app-list-to-dos",
  templateUrl: "./list-to-dos.component.html",
  styleUrls: ["./list-to-dos.component.css"]
})
export class ListToDosComponent implements OnInit {
  toDos: todo[];
  isCompleted = false;
  deletedSuccessfully = false;
  loading = false;
  addedList = false;
  savedSuccess = false;
  deletedId;
  closeThisModal = false;
  disableSubmitBtn = false;
  // modal stuff
  id;
  userName;
  description: any;
  date;
  payload: any = {};
  descriptionOfCompletedList;

  name: any = sessionStorage.getItem("authenticateUser");
  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoService: TodoDataService
  ) {}
  // PARENT
  ngOnInit() {
    this.name = this.activatedRoute.snapshot.params["name"];
    console.log(this.name);
    this.loadAllList();
  }

  reloadList() {
    if (this.addedList == true) {
      this.savedSuccess = true;
      this.loadAllList();
    }
  }

  generateDate(date) {
    // date = this.date;
    let isoDate = new Date(date).toISOString();
    console.log("this is date" + isoDate);
    return isoDate;
  }

  saveNewList(event) {
    console.log("saving");
    event.preventDefault();
    this.generateDate(this.date);
    this.payload.description = this.description;
    this.payload.setDate = this.date;
    this.payload.isDone = false;
    console.log("this is payload " + JSON.stringify(this.payload));
    this.todoService.saveNewList(this.userName, this.payload).subscribe(
      response => {
        console.log(response);
        this.resetForm();
        this.loadAllList();
      },
      error => {
        console.log(error);
      }
    );
  }

  resetForm() {
    this.disableSubmitBtn = true;
    this.description = "";
    this.date = "";
  }

  loadAllList() {
    this.todoService.retrieveAllTodos(this.name).subscribe(
      response => {
        console.log(response);
        this.toDos = response;
      },
      error => {
        this.loading = true;
        console.log(error);
      }
    );
  }

  updateThisById(event, id) {
    console.log(event.target.id);
    id = event.target.id;

    this.todoService.getSingleTodoItem(this.userName, id).subscribe(
      res => {
        console.log(res);
        data => (this.toDos = data);
        this.description = res.description;
        this.date = res.setDate;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteThisById(event) {
    this.descriptionOfCompletedList = event.target.value;
    this.deletedId = event.target.id;
    console.log(event.target.value);
    this.todoService
      .deleteItemFromList(this.name, this.deletedId)
      .subscribe(res => {
        console.log(res);
      });

    this.deletedSuccessfully = true;
    setTimeout(() => {
      this.deletedSuccessfully = false;
      this.todoService.retrieveAllTodos(this.name).subscribe(response => {
        console.log(response);
        this.toDos = response;
        console.log(typeof this.toDos);
      });
    }, 3000);
  }
  // this.router.navigate([`users/${this.name}/list-to-dos`]);

  goBackToWelcomePage() {
    //navigate to last page
    this.router.navigate([`/welcome/:${this.name}`]);
  }

  popModalOpen() {
    this.closeThisModal = true;
  }
}
