import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserRegistrationComponent } from "app/user-registration/user-registration.component";
import { RegistrationFormComponent } from "app/user-registration/registration-form/registration-form.component";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './users-list/user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegistrationLogComponent } from './user-registration/registration-log/registration-log.component';
import { UserService } from "app/_services/user.service";
import { LoginService } from "app/_services/login.service";
import { SignupService } from "app/_services/signup.service";
import { AuthGuard } from "app/_guards/auth.guard";
import { PizzasListComponent } from './pizzas-list/pizzas-list.component';
import { PizzaDetailComponent } from './pizzas-list/pizza-detail/pizza-detail.component';
import { PizzaInsertComponent } from './pizza-insert/pizza-insert.component';
import { PizzaInsertFormComponent } from './pizza-insert/pizza-insert-form/pizza-insert-form.component';

const appRoutes: Routes = [
  { path: "signin", component: LoginComponent },
  { path: "signup", component: UserRegistrationComponent },
  { path: "users", component: UsersListComponent },
  { path: "users/:username", component: UserDetailComponent },
  { path: "pizzas", component: PizzasListComponent },
  { path: "newpizza", component: PizzaInsertComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserRegistrationComponent,
    RegistrationFormComponent,
    UserProfileComponent,
    UsersListComponent,
    UserDetailComponent,
    LoginComponent,
    LoginFormComponent,
    RegistrationLogComponent,
    PizzasListComponent,
    PizzaDetailComponent,
    PizzaInsertComponent,
    PizzaInsertFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    SignupService, 
    LoginService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
