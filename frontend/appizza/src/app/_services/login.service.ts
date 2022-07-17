import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { LoginData } from "../_models/login-data.model";
import { map } from "rxjs/operators";

@Injectable()
export class LoginService {
  apiURL = "https://appizza.altervista.org/php/api/login_verify.api.php";

  constructor(private http: HttpClient) {}

  login(loginData: LoginData) {
    let headers = new Headers();
    headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    const body =
      "username=" + loginData.username + "&password=" + loginData.password;

    console.log("LoginService.. Sending HTTP Request, Body: " + body);

    return this.http
      .post(this.apiURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded; charset=UTF-8"
        ),
      })
      .pipe(
        map((response: { success: boolean, token: string, error: string }) => {
          if (response.token) {
            localStorage.setItem("currentUser", response.token);
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
