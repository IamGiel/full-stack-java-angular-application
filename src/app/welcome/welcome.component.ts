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
      response => this.handleSuccessfulResponse(response)
    );
    console.log("last line of getWelcomeMessage");
  }

  handleSuccessfulResponse(response) {
    console.log("handleSuccessfulResponse " + JSON.stringify(response));
    return response;
  }

  goToDoListPage() {
    this.router.navigate(["list-to-dos"]);
  }
}
