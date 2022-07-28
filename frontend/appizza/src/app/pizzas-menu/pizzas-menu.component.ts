import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import { Pizza } from '../_models/pizza.model';

@Component({
  selector: 'app-pizzas-menu',
  templateUrl: './pizzas-menu.component.html'
})
export class PizzasMenuComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.pizzas$ = this.store.select('seller', 'pizzas');
  }
}
