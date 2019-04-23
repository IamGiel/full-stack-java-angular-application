import { Component, OnInit } from "@angular/core";
import { HardcodedAuthenticationService } from "../service/hardcoded-authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  userName: any = "";

  constructor(
    private router: Router,
    private HardcodedAuthenticationService: HardcodedAuthenticationService
  ) {}

  ngOnInit() {
    this.isUserLoggedIn = this.HardcodedAuthenticationService.isUserLoggedIn();
    this.userName = sessionStorage.getItem("authenticateUser");
    console.log("isUserLoggedIn " + this.isUserLoggedIn);
  }

  toDoListsPage() {
    //  this.HardcodedAuthenticationService.userLoggedOut();
    this.router.navigate([`/users/${this.userName}/list-to-dos`]);
  }

  logout() {
    this.HardcodedAuthenticationService.userLoggedOut();
    this.router.navigate(["/logout"]);
  }
}
