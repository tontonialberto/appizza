import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/_models/user.model';
import { SignupService } from 'src/app/_services/signup.service';
import { createUser } from '../store/admin.actions';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
})
export class UserRegistrationComponent implements OnInit {
  signupResult: string;

  constructor(private signupService: SignupService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  onRegisterUser(newUser: User) {
    this.store.dispatch(createUser(newUser));
    // this.signupService.insertUser(newUser)
    //   .subscribe(
    //     (response: any) => this.signupResult = response,
    //     (error) => console.log(error)
    //   );
  }

}
