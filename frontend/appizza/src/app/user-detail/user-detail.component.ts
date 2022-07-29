import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { User } from "../_models/user.model";
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  user: User = new User("", "", "", null, null, "", "", null);

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users: User[]) => this.user = users.filter((user) => user.username == this.route.snapshot.params["username"]).shift()
    );
  }

}
