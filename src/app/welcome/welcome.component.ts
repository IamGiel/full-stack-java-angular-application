import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  name;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.params["name"];
  }

  goToDoListPage() {
    this.router.navigate(["list-to-dos"]);
  }
}
