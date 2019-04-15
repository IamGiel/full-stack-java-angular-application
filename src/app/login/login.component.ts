import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HardcodedAuthenticationService } from "../service/hardcoded-authentication.service";

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

  constructor(
    private router: Router,
    private hardCodedAuth: HardcodedAuthenticationService
  ) {}

  ngOnInit() {}

  handLogin($event) {
    $event.preventDefault();

    this.newUserCredential.username = this.usernameInput;
    this.newUserCredential.password = this.passwordInput;

    let test = $event.target.addEventListener.name;
    console.log(this.newUserCredential);

    if (
      this.hardCodedAuth.authenticate(
        this.newUserCredential.username,
        this.newUserCredential.password
      )
    ) {
      // alert("it works");
      this.router.navigate(["welcome", this.username]);
    } else {
      // alert("wrong credentials");
      this.router.navigate(["error"]);
    }
  }
}
