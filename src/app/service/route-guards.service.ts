import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { HardcodedAuthenticationService } from "./hardcoded-authentication.service";

@Injectable({
  providedIn: "root"
})
export class RouteGuardsService implements CanActivate {
  constructor(
    private router: Router,
    private hardcodedAuth: HardcodedAuthenticationService
  ) {}

  isLoggedIn = this.hardcodedAuth.isUserLoggedIn();

  // this is an enum method
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // reutrn true if the user is logged in
    if (this.isLoggedIn) {
      console.log("test if logged in " + this.isLoggedIn);
      return true;
    } else {
      // if user not login, rerout to login page
      this.router.navigate(["login"]);
    }
  }
}
