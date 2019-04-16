import { Component, OnInit } from "@angular/core";
import { HardcodedAuthenticationService } from "../service/hardcoded-authentication.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {
  userName: any;
  isLoggedIn: boolean;

  constructor(private hardCodedAuthService: HardcodedAuthenticationService) {}

  ngOnInit() {
    this.isLoggedIn = this.hardCodedAuthService.isUserLoggedIn();
    this.userName = sessionStorage.getItem("authenticateUser");
  }
}
