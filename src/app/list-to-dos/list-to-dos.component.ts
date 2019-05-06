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
  isCompleted: boolean;
  deletedSuccessfully = false;
  loading = false;
  addedList = false;
  savedSuccess = false;
  deletedId;
  closeThisModal = false;
  disableSubmitBtn = false;
  showUpdateBtn = false;
  updateDescription;
  updateDate;
  // modal stuff
  id;
  userName;
  description: any;
  date;
  payload: any = {};
  updatedPayload: any = {};
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
    var current = new Date(date); //'Mar 11 2015' current.getTime() = 1426060964567
    var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
    followingDay.toLocaleDateString();
    console.log("this is follwong day " + followingDay.toLocaleDateString());

    return followingDay.toLocaleDateString();

    // // date = this.date;
    // let isoDate = new Date(date).toISOString();
    // console.log("this is date" + isoDate);
    // return isoDate;
  }

  updateAnItem(event) {
    event.preventDefault();
    let id = parseInt(this.id);
    this.generateDate(this.date);
    this.updateDate = this.date.toLocaleString("en-US", {
      timeZone: "America/New_York"
    });

    this.updatedPayload.description = this.updateDescription;
    this.updatedPayload.setDate = this.updateDate;
    console.log(this.updateDate);
    this.setIsDone();
    this.updatedPayload.isDone = this.isCompleted;
    this.updatedPayload.id = id;

    console.log(JSON.stringify(this.updatedPayload));
    this.todoService
      .updateAnItem(this.name, this.updatedPayload.id, this.updatedPayload)
      .subscribe(
        res => {
          console.log("this is res " + JSON.stringify(res));
          this.loadAllList();
        },
        err => {
          console.log(err);
        }
      );
  }

  setIsDone() {
    let selectedDate = new Date(this.updateDate);
    let now = new Date();
    if (selectedDate < now) {
      this.isCompleted = true;
      alert("true");
    } else {
      this.isCompleted = false;
      alert("false");
    }
  }

  saveNewList(event) {
    console.log("saving");
    event.preventDefault();
    this.generateDate(this.date);
    this.payload.description = this.description;
    this.payload.setDate = this.date;
    this.setIsDone();
    this.payload.isDone = this.isCompleted;
    console.log("this is payload " + JSON.stringify(this.payload));
    this.todoService.saveNewList(this.name, this.payload).subscribe(
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

  getSingleTodoDetails(event, id) {
    this.showUpdateBtn = true;
    console.log(event.target.id);
    this.id = event.target.id;

    this.todoService.getSingleTodoItem(this.userName, this.id).subscribe(
      res => {
        console.log(res);
        let data: any = res;
        console.log(data);
        this.updateDescription = data.description;
        this.updateDate = data.setDate;

        this.payload.description = this.description;
        this.payload.setDate = this.date;
        this.payload.isDone = false;
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
    this.showUpdateBtn = false;
  }
}
