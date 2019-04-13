import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username = "Gel";
  password = "";

  newUserCredential: any = {};

  constructor() {}

  ngOnInit() {}

  handLogin($event) {
    $event.preventDefault();

    this.newUserCredential.username = this.username;
    this.newUserCredential.password = this.password;

    let test = $event.target.addEventListener.name;
    console.log(this.newUserCredential);
  }
}
