import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";
import { selectUser } from '../store/admin.actions';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;

  user: User = null;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    const username = this.route.snapshot.params['username'];
    this.store.dispatch(selectUser({ username: username }));
    
    this.user$ = this.store.select('admin', 'selectedUser');
    this.user$.subscribe((user: User) => {
      if(user === null) {
        this.router.navigate(['/users']);
      }
      else {
        this.user = user;
      }
    });

    // this.userService.getUsers().subscribe(
    //   (users: User[]) => this.user = users.filter((user) => user.username == this.route.snapshot.params["username"]).shift()
    // );
  }

}
