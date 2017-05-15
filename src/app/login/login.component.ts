import { Component, OnInit } from '@angular/core';

import { LoginService } from "app/_services/login.service";
import { LoginData } from "app/_models/login-data.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    //this.onLogin({username: "TESTUSER", password: "12345"});
  }

  onLogin(loginData: LoginData) {
    this.loginService.login(loginData)
      .subscribe(
        (response) => {
          if(response) {
            window.alert("Benvenuto!");
          } else {
            window.alert("Nome utente o password errati");
          }
        },
        (error) => console.log(error)
      );
  }

}
