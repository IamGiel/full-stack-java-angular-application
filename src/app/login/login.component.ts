import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username = "Gel";
  password = "password";

  //userInput
  usernameInput = "";
  passwordInput = "";

  newUserCredential: any = {};

  constructor(private router: Router) {}

  ngOnInit() {}

  handLogin($event) {
    $event.preventDefault();

    this.newUserCredential.username = this.username;
    this.newUserCredential.password = this.password;

    let test = $event.target.addEventListener.name;
    console.log(this.newUserCredential);

    if (
      this.usernameInput === this.username &&
      this.passwordInput === this.password
    ) {
      // alert("it works");
      this.router.navigate(["welcome", this.username]);
    } else {
      // alert("wrong credentials");
      this.router.navigate(["error"]);
    }
  }
}
