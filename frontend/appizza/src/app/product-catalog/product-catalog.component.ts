import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import { Pizza } from '../_models/pizza.model';
import { deletePizza } from './store/seller.actions';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
})
export class ProductCatalogComponent implements OnInit {

  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.pizzas$ = this.store.select('seller', 'pizzas');
  }

  onProductEdit(id: number): void {
    this.router.navigate(['/seller', 'edit', id]);
  }

  onProductDelete(id: number): void {
    const isConfirmed: boolean = confirm(`La pizza verrà eliminata. Confermi?`);
    if (isConfirmed) {
      this.store.dispatch(deletePizza({ id: id }))
    }
  }
}
