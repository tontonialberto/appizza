import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { User } from "app/_models/user.model";
import { UserService } from "app/_services/user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        (users) => {
          this.users = users;
          //console.log(this.users);
        },
        (error) => console.log("Errore: " + error)
      );
  }

}
