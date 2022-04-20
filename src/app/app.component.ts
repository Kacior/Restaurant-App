import { Component, OnInit } from '@angular/core';
import { Dish } from './dish/dish';
import myData from './dishes.json';
import { environment } from '../environments/environment'; 
import{ AngularFireDatabaseModule }from'@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'restauracja';
  
  ngOnInit(): void {
 
  }
}
