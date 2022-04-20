import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { Dish } from '../dish/dish';
import myData from '../dishes.json';
import { DishlistserverService } from '../dishlistserver.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-dishlist',
  templateUrl: './dishlist.component.html',
  styleUrls: ['./dishlist.component.css']
})
export class DishlistComponent implements OnInit {

  listOfDishes: Dish[]=[];
  max: number = -1;
  min: number = Number.POSITIVE_INFINITY;
  p: number = 1;
 
  constructor(private _dishlistService: DishlistserverService) { 
    this.importDishList();
  }

  ngOnInit(): void {
  }

  receiveMessage(event){
  }

  removeDish(event){
   this._dishlistService.removeDish(event);
  }

  
  divStyleObject(dish: Dish){
    console.log(this.max);
    if(dish.price>=this.max){
      return {'background': 'red'}
    }
    if(dish.price<=this.min){
      return{'background' : 'lightgreen'}
    }
    return {}
  }


  importDishList() {
    this._dishlistService.getDishList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => // [???]
          ( 
            {key: c.payload.key, ...c.payload.val()}
          )
        )
      )
    ).subscribe(
      dishes => {
        this.listOfDishes = <Array<Dish>>dishes;
        this.findLeastMostExpensive();
      }
    );
  }

  findLeastMostExpensive(){
    this.max = Math.max(...this.listOfDishes.map(dish => dish.price))
    this.min = Math.min(...this.listOfDishes.map(dish => dish.price)) 
  }
}
