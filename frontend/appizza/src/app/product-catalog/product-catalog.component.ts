import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startUpdatingPizza } from '../app.actions';
import { AppState } from '../app.reducer';
import { Pizza } from '../_models/pizza.model';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
})
export class ProductCatalogComponent implements OnInit {

  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.pizzas$ = this.store.select('app', 'pizzas');
  }

  onProductEdit(id: number): void {
    this.router.navigate(['/seller', 'edit', id]);
  }
}
