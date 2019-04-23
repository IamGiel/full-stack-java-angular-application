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
  deletedId;
  descriptionOfCompletedList;
  // [
  //   {
  //     id: 1,
  //     description: "Parachute off of a plane!"
  //   },
  //   {
  //     id: 2,
  //     description: "Swim with sharks!"
  //   },
  //   {
  //     id: 3,
  //     description: "Climb Mt Everest!"
  //   },
  //   {
  //     id: 4,
  //     description: "Travel to Korea and taste its cuisines!"
  //   }
  // ];

  name: any = sessionStorage.getItem("authenticateUser");
  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoService: TodoDataService
  ) {}

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.params["name"];
    console.log(this.name);

    this.todoService.retrieveAllTodos(this.name).subscribe(response => {
      console.log(response);
      this.toDos = response;
      console.log(typeof this.toDos);
    });
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
}
