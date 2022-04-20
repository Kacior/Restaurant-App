import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DishlistserverService } from '../dishlistserver.service';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../dish/dish';
import { map } from 'rxjs/operators';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {
  dish: any={};

  addReviewForm = new FormGroup({
    title: new FormControl("title", [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    review: new FormControl("review", [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    nick: new FormControl("nick", [Validators.required, Validators.pattern('[a-zA-Z]*')])
  });

  constructor(private _dishservice : DishlistserverService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    var key = this.route.snapshot.params['id'];
    this.getSpecifiedDish(key);
  }

  onSubmit(){
    if(this.addReviewForm.valid){
      var data = this.addReviewForm.value;
      var title=data.title;
      var desciption=data.review;
      var nick = data.nick;
      var result=title+" "+nick+"\n"+desciption;
    var name=this.dish.name;
    //this._dishservice.addReview(result, name);
    }
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
      }
    );
  }

}
