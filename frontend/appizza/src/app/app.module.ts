import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { RegistrationFormComponent } from "./user-registration/registration-form/registration-form.component";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './users-list/user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegistrationLogComponent } from './user-registration/registration-log/registration-log.component';
import { UserService } from "./_services/user.service";
import { LoginService } from "./_services/login.service";
import { SignupService } from "./_services/signup.service";
import { AuthGuard } from "./_guards/auth.guard";
import { PizzasMenuComponent } from './pizzas-menu/pizzas-menu.component';
import { PizzaDetailComponent } from './pizzas-menu/pizza-detail/pizza-detail.component';
import { PizzaInsertComponent } from './pizza-insert/pizza-insert.component';
import { ProductEditComponent } from './pizza-insert/product-edit/product-edit.component';
import { appReducer } from './app.reducer';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

const appRoutes: Routes = [
  { path: "signin", component: LoginComponent },
  { path: "signup", component: UserRegistrationComponent },
  { path: "users", component: UsersListComponent },
  { path: "users/:username", component: UserDetailComponent },
  { path: "pizzas", component: PizzasMenuComponent },
  { path: "newpizza", component: PizzaInsertComponent },
  { path: 'seller', component: ProductCatalogComponent }
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
    PizzasMenuComponent,
    PizzaDetailComponent,
    PizzaInsertComponent,
    ProductEditComponent,
    ProductCatalogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({app: appReducer}, {})
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
