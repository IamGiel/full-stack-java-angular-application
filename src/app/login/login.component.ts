import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HardcodedAuthenticationService } from "../service/hardcoded-authentication.service";
import { BasicAuthenticationService } from "../service/basic-authentication.service";

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
    private router: Router
  ) // private hardCodedAuth: HardcodedAuthenticationService
  {}

  ngOnInit() {}

  handleBasicLogin() {
    this.basicAuthService
      .executeJWTAuthenticationService(this.usernameInput, this.passwordInput)
      .subscribe(
        data => {
          console.log(
            "this is data from basicAUthService " + JSON.stringify(data)
          );
          console.log(
            "username " +
              JSON.stringify(this.usernameInput) +
              "password " +
              JSON.stringify(this.passwordInput)
          );

          this.newUserCredential.username = this.usernameInput;
          this.router.navigate(["/welcome", this.newUserCredential.username]);
        },
        err => {
          console.log("error in authentication erred block" + err);
          this.router.navigate(["error"]);
        }
      );
  }
}
