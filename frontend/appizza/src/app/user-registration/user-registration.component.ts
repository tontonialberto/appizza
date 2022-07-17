import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user.model';
import { SignupService } from '../_services/signup.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
})
export class UserRegistrationComponent implements OnInit {
  signupResult: string;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
  }

  onRegisterUser(newUser: User) {
    this.signupService.insertUser(newUser)
      .subscribe(
        (response: any) => this.signupResult = response,
        (error) => console.log(error)
      );
  }

}
