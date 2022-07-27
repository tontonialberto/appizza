import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPizza } from 'src/app/app.actions';
import { AppState } from 'src/app/app.reducer';
import { Pizza } from 'src/app/_models/pizza.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }
  
  onSubmit(form: NgForm): void {
    const pizza = new Pizza(
      form.value.name,
      form.value.price,
      true,
      form.value.description,
      form.value.imagePath
    );
    this.store.dispatch(addPizza(pizza));
  }

}
