import { Component, OnInit } from '@angular/core';

import { User } from "app/_models/user.model";
import { SignupService } from "app/_services/signup.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  signupResult: string;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
  }

  onRegisterUser(newUser: User) {
    this.signupService.insertUser(newUser)
      .subscribe(
        (response) => this.signupResult = response,
        (error) => console.log(error)
      );
  }

}
