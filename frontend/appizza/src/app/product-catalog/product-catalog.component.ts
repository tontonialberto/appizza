import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import { Pizza } from '../_models/pizza.model';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
})
export class ProductCatalogComponent implements OnInit {

  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.pizzas$ = this.store.select('app', 'pizzas');
  }

}
