import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Pizza } from '../_models/pizza.model';

@Component({
  selector: 'app-pizzas-list',
  templateUrl: './pizzas-list.component.html'
})
export class PizzasListComponent implements OnInit {

  pizzas: Pizza[] = [];

  pizzasObs: Observable<Pizza[]>;

  constructor(private store: Store<{ app: { pizzas: [] } }>) { }

  ngOnInit() {
    this.pizzasObs = this.store.select('app')
      .pipe(
        map((state: { pizzas: [] }) => state.pizzas)
      );
    this.pizzasObs.subscribe((pizzas: Pizza[]) => {
      this.pizzas = pizzas;
    });
  }

}
