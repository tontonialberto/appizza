import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { UserService } from "app/_services/user.service";
import { LoginService } from "app/_services/login.service";
import { SignupService } from "app/_services/signup.service";
import { AuthGuard } from "app/_guards/auth.guard";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, [
  UserService,
  SignupService, 
  LoginService,
  AuthGuard
  ]
);
