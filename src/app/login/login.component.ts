import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HardcodedAuthenticationService } from "../service/hardcoded-authentication.service";
import { BasicAuthenticationService } from "../service/basic-authentication.service.1";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  //userInput
  usernameInput = "";
  passwordInput = "";

  newUserCredential: any = {};

  constructor(
    private basicAuthService: BasicAuthenticationService,
    private router: Router,
    private hardCodedAuth: HardcodedAuthenticationService
  ) {}

  ngOnInit() {}

  handleBasicLogin() {
    this.basicAuthService
      .executeBasicAuthenticationService(this.usernameInput, this.passwordInput)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(["welcome", this.newUserCredential.username]);
        },
        err => {
          console.log(err);
          this.router.navigate(["error"]);
        }
      );
  }

  // handLogin($event) {
  //   $event.preventDefault();

  //   this.newUserCredential.username = this.usernameInput;
  //   this.newUserCredential.password = this.passwordInput;

  //   let test = $event.target.addEventListener.name;
  //   console.log(this.newUserCredential);

  //   if (
  //     this.hardCodedAuth.authenticate(
  //       this.newUserCredential.username,
  //       this.newUserCredential.password
  //     )
  //   ) {
  //     // alert("it works");
  //     this.router.navigate(["welcome", this.newUserCredential.username]);
  //   } else {
  //     // alert("wrong credentials");
  //     this.router.navigate(["error"]);
  //   }
  // }
}
