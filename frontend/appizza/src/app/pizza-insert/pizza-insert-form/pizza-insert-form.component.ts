import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPizza } from 'src/app/app.actions';
import { Pizza } from 'src/app/_models/pizza.model';

@Component({
  selector: 'app-pizza-insert-form',
  templateUrl: './pizza-insert-form.component.html'
})
export class PizzaInsertFormComponent implements OnInit {

  constructor(private store: Store<{ app: { pizzas: Pizza[] } }>) { }

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
    this.store.dispatch(addPizza({ pizza: pizza }));
  }

}
