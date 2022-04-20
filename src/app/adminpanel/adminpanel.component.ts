import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { WebsiteUser } from '../user';
import { UserserviceService } from '../userservice.service';
import { map } from 'rxjs';



@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  userList: WebsiteUser[]=[];

  constructor(public authService: AuthserviceService, public userservice: UserserviceService) { }

  ngOnInit(): void {
    this.importUserList();
  }

  changePersistence(mode: string){
    console.log(mode)
    this.authService.changePersistence(mode);
    alert("Changed persistance")
  }

  importUserList() {
    this.userservice.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => // [???]
          ( 
            {key: c.payload.key, ...c.payload.val()}
          )
        )
      )
    ).subscribe(
      users => {
        this.userList = <Array<WebsiteUser>>users;
      }
    );
    console.log(this.userList);

  }

  removeUser(uid: string){
    this.userservice.deleteUser(uid);
  }

  makeManager(uid:string, email: string){
    this.userservice.updateUser(uid, new WebsiteUser(email, 3, uid))
  }

  makeAdmin(uid:string, email: string){
    this.userservice.updateUser(uid, new WebsiteUser(email, 2, uid))
  }

  makeClient(uid:string, email: string){
    this.userservice.updateUser(uid, new WebsiteUser(email, 1, uid))
  }
}
