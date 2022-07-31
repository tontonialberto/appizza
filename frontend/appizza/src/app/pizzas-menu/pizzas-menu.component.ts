import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import * as fromShoppingCart from '../shopping-cart/store/shopping-cart.actions';
import { Pizza } from '../_models/pizza.model';

@Component({
  selector: 'app-pizzas-menu',
  templateUrl: './pizzas-menu.component.html'
})
export class PizzasMenuComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;
  pizzas: Pizza[] = [];

  quantities: {productId: number, quantity: number}[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.pizzas$ = this.store.select('seller', 'pizzas');
    this.pizzas$.subscribe((pizzas: Pizza[]) => {
      pizzas.forEach(pizza => this.quantities.push({ productId: pizza.id, quantity: 1}));
      this.pizzas = pizzas;
    })
  }

  getQuantityItem(productId: number): {productId: number, quantity: number} {
    return this.quantities.find(q => q.productId === productId);
  }

  onDecreaseQuantity(productId: number): void {
    const item = this.quantities.find(q => q.productId === productId);
    if(item !== undefined && item?.quantity > 1) {
      item.quantity--;
    }
  }

  onIncreaseQuantity(productId: number): void {
    const item = this.quantities.find(q => q.productId === productId);
    if(item !== undefined) {
      item.quantity++;
    }
  }

  onSubmit(productId: number, form: NgForm): void {
    const product: Pizza = this.pizzas.find(pizza => productId === pizza.id);
    if(product !== undefined) {
      this.store.dispatch(fromShoppingCart.addToCart({ product: product, quantity: form.value.quantity }));
    }
  }
}
