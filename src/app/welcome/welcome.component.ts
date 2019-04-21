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
  customMessage;
  welcomeMessageReceived = false;
  errorMessageReceived = false;
  errorResponse;
  constructor(
    private welcomeService: WelcomeDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.params["name"];
  }

  getWelcomeMessage() {
    console.log(this.welcomeService.executeHelloWorldBeanService());
    this.welcomeService.executeHelloWorldBeanService().subscribe(
      // what we do when we get result

      response => {
        this.welcomeMessageReceived = true;
        this.handleSuccessfulResponse(response.message);
        this.customMessage = response.message;
      },

      error => {
        this.errorMessageReceived = true;
        this.handleErrorResponse(error);
        this.errorResponse = this.handleErrorResponse(error);
        console.log("error response " + this.errorResponse);
      }
    );
    this.handleErrorResponse(this.errorResponse);
    console.log("last line of getWelcomeMessage");
  }

  handleSuccessfulResponse(response) {
    console.log("handleSuccessfulResponse " + JSON.stringify(response));
  }

  handleErrorResponse(error) {
    console.log("handleErrorResponse " + JSON.stringify(error.error.message));
    return error.error.message;
  }

  goToDoListPage() {
    this.router.navigate(["list-to-dos"]);
  }
}
