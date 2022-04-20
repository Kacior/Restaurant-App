import { Injectable } from '@angular/core';
import { Dish } from './dish/dish';

@Injectable({
  providedIn: 'root'
})
export class TrolleyserviceService {
  orderList: Dish[] = [];
  totalSum: number = 0;
  constructor() { }

  addOrder(event) {
    this.totalSum += event.price;
    this.orderList.push(event);
  }

  removeOrder(event) {
    this.totalSum -= event.price;
    var index = 0;
    for (let entry of this.orderList) {
      if (entry.name == event.name) {
        this.orderList.splice(index, 1);
      }
      break;
      index++;
    }
  }

  getOrders() {
    return this.orderList;
  }

  getTotalPrice() {
    return this.totalSum;
  }

  getDishOrderCount(dish) {
    var count = 0;
    this.orderList.forEach((element, index) => {
      if (element.name == dish.name) count += 1;
    });
    return (dish.serveLimit - count);
  }

  finalizeOrder(){
    this.totalSum=0;
    this.orderList=[];
  }
}
