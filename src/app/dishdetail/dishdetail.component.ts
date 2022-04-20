import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Dish } from '../dish/dish';
import { DishlistserverService } from '../dishlistserver.service';
import { map } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import { TrolleyserviceService } from '../trolleyservice.service';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})

export class DishdetailComponent implements OnInit {
  
  dish: any={};
  avaiableDishes: number=0;
  outOfStockMessage:string ="";


  constructor(private _dishservice : DishlistserverService,private route: ActivatedRoute, private _trolleyservice : TrolleyserviceService) { }

  ngOnInit(): void {
    var key = this.route.snapshot.params['id'];
    this.getSpecifiedDish(key);
    this.avaiableDishes=this._trolleyservice.getDishOrderCount(this.dish);
  }

  getSpecifiedDish(key: string){
    var res: Dish[];
    this._dishservice.getDishList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ( 
            {key: c.payload.key, ...c.payload.val()}
          )
        )
      )
    ).subscribe(
      dishesData => {
         var dishes = <Array<Dish>>dishesData;      
         res = dishes.filter(h => h.key == key)
         this.dish = res.pop()
         this.avaiableDishes=this.dish.serveLimit;
      }
    );
  }
  
  orderDish(){
    this._trolleyservice.addOrder(this.dish);
    this.avaiableDishes=this._trolleyservice.getDishOrderCount(this.dish);
  }

  returnDishOrder(){
    this._trolleyservice.removeOrder(this.dish);
    this.avaiableDishes=this._trolleyservice.getDishOrderCount(this.dish);
  }
  
  addStyleObject(): Object{
    if(this.avaiableDishes==0){
      this.outOfStockMessage="Sorry, we are out of stock.";
      return {visibility:'hidden'}
    }
    this.outOfStockMessage="";
    return {}
  }

  returnStyleObject(): Object{
    if(this.avaiableDishes==this.dish.serveLimit){
      return {visibility:'hidden'}
    }
    return {}  
  }


  dishInfoStyleObject(): Object{
    if(this.avaiableDishes>=10){
      return {color:'darkgreen'}
    }
    else if(this.avaiableDishes<10){
      return {color:'orange'}
    }
    return {}
  }

  
}
