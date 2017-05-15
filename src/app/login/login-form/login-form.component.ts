import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginData } from "app/_models/login-data.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output("mySubmit") formSubmitted = new EventEmitter<LoginData>();
  loginData: LoginData = new LoginData("", "");
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      "username": [this.loginData.username, Validators.required],
      "password": [this.loginData.password, Validators.required]
    });
  }
  
  onSubmit() {
    this.loginData = this.loginForm.value;
    this.formSubmitted.emit(this.loginData);
    //console.log(this.loginData);
  }
}
