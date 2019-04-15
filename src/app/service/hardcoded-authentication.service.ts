import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HardcodedAuthenticationService {
  constructor() {}

  authenticate(user, password) {
    if (user === "Gel" && password === "password") {
      return true;
    } else {
      return false;
    }
  }
}
