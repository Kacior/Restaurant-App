import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { Dish } from './dish';
import { Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { TrolleyserviceService } from '../trolleyservice.service';
import { UserInteractionServiceService } from '../user-interaction-service.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit{
  @Input() dish: Dish;
  outOfStockMessage: string = "";
  avaiableDishes: number=0;
  @Output() dishOrderEvent = new EventEmitter<number>();
  @Output() removeDishEvent = new EventEmitter<Dish>();
  currentRole=0;

  constructor(private router : Router, private _trolleyservice: TrolleyserviceService, public userservice: UserInteractionServiceService) {
    this.userservice.user$.subscribe(
      u => {
      if (u != null){
        this.currentRole = u.role
      }else{
        //this.currentUser = null;
        this.currentRole = 0
      }
    }
    )
  }

  ngOnInit(): void{
    this.avaiableDishes=this._trolleyservice.getDishOrderCount(this.dish);
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

  removeDish(){
    this.removeDishEvent.emit(this.dish);
  }

  showDetails(dish){
    this.router.navigate(['dishlist', dish.key]);
  }
}
