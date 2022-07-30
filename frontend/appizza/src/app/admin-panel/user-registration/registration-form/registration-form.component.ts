import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
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
      "username": new FormControl(this.user.username, [Validators.required]),
      "password": new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
      "email": new FormControl(this.user.email, [Validators.required, Validators.email]),
      "userlevel": new FormControl(this.user.userlevel, [Validators.required]),
      "classe": new FormControl(this.user.classe),
      "nome": new FormControl(this.user.nome, [Validators.required]),
      "cognome": new FormControl(this.user.cognome, [Validators.required]),
      "citta": new FormControl(this.user.citta)
    });
  }
  
  onSubmit() {
    this.user = this.registrationForm.value;
    this.formSubmitted.emit(this.user);
  }
}
