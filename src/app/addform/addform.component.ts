import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../dish/dish';
import { DishlistserverService } from '../dishlistserver.service';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {
  @Output() newDishEvent = new EventEmitter<Dish>();

  addDishForm = new FormGroup({
    name: new FormControl("testname", [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    kitchen: new FormControl("testkitchen", [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    type: new FormControl("testtype", [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    category: new FormControl("testcategory", [Validators.required,Validators.pattern('[a-zA-Z]*')]),
    ingredients: new FormControl("testingredients", [Validators.required, Validators.pattern('[a-zA-Z ,]*')]),
    serveLimit: new FormControl(10, [Validators.required, Validators.min(1)]),
    price: new FormControl(10, [Validators.required, Validators.min(1)]),
    description: new FormControl("testdesc", [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    imageSrc: new FormControl("assets/food.jpg", [Validators.required])
  });

  constructor(private _dishlistService: DishlistserverService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.addDishForm.valid){
    var toAdd = new Dish();
    var data = this.addDishForm.value;
    toAdd.name=data.name;
    toAdd.category=data.category;
    toAdd.type=data.type;
    toAdd.ingredients=(data.ingredients).split(",", 10);
    toAdd.serveLimit=data.serveLimit;
    toAdd.price=data.price;
    toAdd.description=data.description;
    toAdd.imageSrc=data.imageSrc;
    this.newDishEvent.emit(toAdd);
    }
  }

}

