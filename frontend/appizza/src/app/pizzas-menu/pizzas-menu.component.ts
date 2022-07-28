import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState, State } from '../app.reducer';
import { Pizza } from '../_models/pizza.model';

@Component({
  selector: 'app-pizzas-menu',
  templateUrl: './pizzas-menu.component.html'
})
export class PizzasMenuComponent implements OnInit {

  pizzas: Pizza[] = [];

  pizzasObs: Observable<Pizza[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.pizzasObs = this.store.select('app')
      .pipe(
        map((state: State) => state.pizzas)
      );
    this.pizzasObs.subscribe((pizzas: Pizza[]) => {
      this.pizzas = pizzas;
    });
  }

}
