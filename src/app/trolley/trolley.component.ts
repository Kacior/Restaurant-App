import { Component, OnInit } from '@angular/core';
import { TrolleyserviceService } from '../trolleyservice.service';
import { Dish } from '../dish/dish';

@Component({
  selector: 'app-trolley',
  templateUrl: './trolley.component.html',
  styleUrls: ['./trolley.component.css']
})
export class TrolleyComponent implements OnInit {
  orderList: Dish[]=[];
  sum: number=0;
  constructor(private _interactionTrolleyService: TrolleyserviceService) {
   }

  ngOnInit(): void {
    this.orderList=this._interactionTrolleyService.getOrders();
    this.sum=this._interactionTrolleyService.getTotalPrice();
  }

  submitOrder(){
    this._interactionTrolleyService.finalizeOrder();
    this.orderList=[];
    this.sum=0;
  }

}
