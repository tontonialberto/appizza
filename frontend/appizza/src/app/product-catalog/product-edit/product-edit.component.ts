import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Pizza } from 'src/app/_models/pizza.model';
import * as fromSeller from '../store/seller.actions';

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

    if(!isNaN(pizzaId)) {
      this.store.dispatch(fromSeller.startUpdatingPizza({ id: pizzaId }));
    }

    this.store.select('seller', 'currentUpdatingPizza')
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
    this.store.dispatch(fromSeller.endUpdatingPizza());
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
      this.store.dispatch(fromSeller.updatePizza(pizza));
    }
    else {
      this.store.dispatch(fromSeller.createPizza(pizza));
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
