import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from "../_models/user.model";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class SignupService {
  apiURL = "https://appizza.altervista.org/php/api/signup.api.php";

  constructor(private http: HttpClient) {}

  insertUser(user: User) {
    if (!user.classe) user.classe = "NO";
    if (!user.citta) user.citta = "NO";

    const body =
      "username=" +
      user.username +
      "&password=" +
      user.password +
      "&email=" +
      user.email +
      "&userlevel=" +
      user.userlevel +
      "&classe=" +
      user.classe +
      "&nome=" +
      user.nome +
      "&cognome=" +
      user.cognome +
      "&citta=" +
      user.citta;

    console.log("SignupService.. Sending HTTP Request, Body: " + body);

    return this.http
      .post(this.apiURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded; charset=UTF-8"
        ),
      })
      .pipe(
        catchError((error: any) => {
          const err = new Error('Server error');
          return throwError(err);
        })
      );
  }
}
