import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './admin-panel/users-list/users-list.component';
import { UserDetailComponent } from './admin-panel/user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { UserService } from "./_services/user.service";
import { LoginService } from "./_services/login.service";
import { SignupService } from "./_services/signup.service";
import { AuthGuard } from "./_guards/auth.guard";
import { PizzasMenuComponent } from './pizzas-menu/pizzas-menu.component';
import { PizzaDetailComponent } from './pizzas-menu/pizza-detail/pizza-detail.component';
import { ProductEditComponent } from './product-catalog/product-edit/product-edit.component';
import { appReducer } from './app.reducer';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { UserRegistrationComponent } from './admin-panel/user-registration/user-registration.component';
import { RegistrationFormComponent } from './admin-panel/user-registration/registration-form/registration-form.component';
import { RegistrationLogComponent } from './admin-panel/user-registration/registration-log/registration-log.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const appRoutes: Routes = [
  { path: "signin", component: LoginComponent },
  { path: "signup", component: UserRegistrationComponent },
  { path: "users", component: UsersListComponent },
  { path: "users/:username", component: UserDetailComponent },
  { path: "pizzas", component: PizzasMenuComponent },
  { path: 'seller', component: ProductCatalogComponent },
  { path: "seller/newpizza", component: ProductEditComponent },
  { path: 'seller/edit/:id', component: ProductEditComponent }
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
    ProductEditComponent,
    ProductCatalogComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, {})
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
