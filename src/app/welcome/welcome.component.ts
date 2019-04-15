import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  name;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.name = this.route.snapshot.params["name"];
  }
}
