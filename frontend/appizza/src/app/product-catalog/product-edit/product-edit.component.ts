import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { createPizza, endUpdatingPizza, startUpdatingPizza, updatePizza } from 'src/app/app.actions';
import { AppState, State } from 'src/app/app.reducer';
import { Pizza } from 'src/app/_models/pizza.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {

  // If false, it's create mode
  editMode = false;
  
  private pizza: Pizza = null;

  @ViewChild('form', { static: true }) form: NgForm;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    const pizzaId = +this.route.snapshot.params['id'];
    console.log(pizzaId)

    if(!isNaN(pizzaId)) {
      this.store.dispatch(startUpdatingPizza({ id: pizzaId }));
    }

    this.store.select('app')
      .pipe(
        map((state: State) => state.currentEditingPizza)
      )
      .subscribe({
        next: (pizza: Pizza) => {
          if(pizza !== null) {
            this.editMode = true;
            this.pizza = pizza;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(endUpdatingPizza());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initForm(), 0);
  }
  
  onSubmit(form: NgForm): void {
    const pizza = new Pizza(
      form.value.name,
      form.value.price,
      true,
      form.value.description,
      form.value.imagePath
    );
    if(this.editMode) {
      pizza.id = this.pizza.id;
      this.store.dispatch(updatePizza(pizza));
    }
    else {
      this.store.dispatch(createPizza(pizza));
    }
  }

  initForm(): void {
    this.form.resetForm();
    if(this.editMode) {
      this.form.setValue({
        name: this.pizza.name,
        price: this.pizza.price,
        description: this.pizza.description,
        imagePath: this.pizza.imagePath
      });
    }
  }

}
