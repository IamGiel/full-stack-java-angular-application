import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { WelcomeDataService } from "../service/welcome-data.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  name;
  pathName;
  customMessage;
  welcomeMessageReceived = false;
  errorMessageReceived = false;
  pathNameProvided = false;
  errorResponse;
  constructor(
    private welcomeService: WelcomeDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.name = this.activatedRoute.snapshot.params["name"];
    this.name = sessionStorage.getItem("authenticateUser");
    console.log(this.name);
    // console.log(this.pathName);
  }

  getWelcomeMessage() {
    this.welcomeService.executeHelloWorldBeanService().subscribe(
      response => {
        this.welcomeMessageReceived = true;
        this.handleSuccessfulResponse(response.message);
        this.customMessage = response.message;
      },

      error => {
        this.errorMessageReceived = true;
        this.handleErrorResponse(error);
        this.errorResponse = this.handleErrorResponse(error);
      }
    );

    // this.getPathWithName(this.name);
  }

  getPathWithName() {
    this.welcomeService.executeHelloPathName(this.name).subscribe(
      response => {
        this.pathNameProvided = true;
        this.handleSuccessfulResponse(response);
        this.pathName = response.message;
      },

      error => {
        console.log(error);
        this.errorMessageReceived = true;
        this.handleErrorResponse(error);
        this.errorResponse = this.handleErrorResponse(error);
      }
    );
  }

  handleSuccessfulResponse(response) {
    console.log("handleSuccessfulResponse " + JSON.stringify(response));
    return response.message;
  }

  handleErrorResponse(error) {
    console.log("handleErrorResponse " + JSON.stringify(error));
    return error;
  }

  goToDoListPage(name) {
    name = this.name;
    this.router.navigate([`/users/${name}/list-to-dos`]);
  }
}
