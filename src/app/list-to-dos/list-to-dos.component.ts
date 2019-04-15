import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Location } from "@angular/common";

@Component({
  selector: "app-list-to-dos",
  templateUrl: "./list-to-dos.component.html",
  styleUrls: ["./list-to-dos.component.css"]
})
export class ListToDosComponent implements OnInit {
  toDos = [
    {
      id: 1,
      description: "Parachute off of a plane!"
    },
    {
      id: 2,
      description: "Swim with sharks!"
    },
    {
      id: 3,
      description: "Climb Mt Everest!"
    },
    {
      id: 4,
      description: "Travel to Korea and taste its cuisines!"
    }
  ];

  name: any;
  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.params["name"];
    console.log(this.name);
  }

  goBackToWelcomePage() {
    //navigate to last page
    this._location.back();
  }
}
