import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";

import { User } from "app/_models/user.model";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  @Output("mySubmit") formSubmitted = new EventEmitter<User>();
  user: User = new User("", "", "", null, null, "", "", null);
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      "username": [this.user.username, Validators.required],
      "password": [this.user.password, Validators.required],
      "email": [this.user.email, Validators.required],
      "userlevel": [this.user.userlevel, Validators.required],
      "classe": [this.user.classe],
      "nome": [this.user.nome, Validators.required],
      "cognome": [this.user.cognome, Validators.required],
      "citta": [this.user.citta]
    });
  }
  
  onSubmit() {
    this.user = this.registrationForm.value;
    this.formSubmitted.emit(this.user);
  }
}
