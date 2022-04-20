import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish } from './dish/dish';
import myData from './dishes.json';
import{ AngularFireDatabase, AngularFireList, AngularFireObject }from'@angular/fire/compat/database';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DishlistserverService {

  listOfDishes: Dish[]=[];

  daneRef: AngularFireList<Object>;
  obsRef: Observable<any[]>;


  constructor(private db: AngularFireDatabase) {
    this.daneRef=db.list('dishes');
    this.obsRef=db.list('dishes').valueChanges();
   }

  getDishList()  {
    return this.daneRef;
  }

  getLocalList(){
    return this.listOfDishes;
  }

  addNewDish(event){
    this.listOfDishes.push(event);
    this.daneRef.push(event);
  }

  removeDish(event){
    this.listOfDishes.forEach((element,index)=>{
      if(element==event) this.listOfDishes.splice(index,1);
   });
   this.daneRef.remove(event.key);
  }
  
}
