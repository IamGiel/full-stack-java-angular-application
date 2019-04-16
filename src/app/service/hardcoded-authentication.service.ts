import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HardcodedAuthenticationService {
  constructor() {}

  authenticate(user, password) {
    // console.log("before .... " + this.isUserLoggedIn());
    if (user === "Gel" && password === "password") {
      sessionStorage.setItem("authenticateUser", user);
      // console.log("after .... " + this.isUserLoggedIn());
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticateUser");

    if (user === null) {
      //user not logged in
      return false;
    } else {
      return true;
    }
  }

  // when logged out, clear storage.
  userLoggedOut() {
    sessionStorage.clear();
  }
}
