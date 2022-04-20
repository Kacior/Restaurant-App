import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Dish } from '../dish/dish';
import { DishlistserverService } from '../dishlistserver.service';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {

  constructor(private _dishlistService : DishlistserverService) { 
  }

  ngOnInit(): void {
  }

  passNewDish(event){
    this._dishlistService.addNewDish(event);
  }
}
