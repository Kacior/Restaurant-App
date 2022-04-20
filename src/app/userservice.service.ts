import { Injectable } from '@angular/core';
import { WebsiteUser } from './user';
import{ AngularFireDatabase, AngularFireList, AngularFireObject }from'@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInteractionServiceService } from './user-interaction-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  daneRef: AngularFireList<WebsiteUser>;

  constructor(private db: AngularFireDatabase, private currentUser: UserInteractionServiceService) { 
    this.daneRef = db.list("users");
  }

  createUser(key,user: WebsiteUser){
    this.db.object(`/users/${key}`).set(user)
  }

  deleteUser(key: string){
    this.daneRef.remove(key)
  }

  updateUser(key: string, updatedUser: any){
    this.daneRef.update(key, updatedUser)
  }

  getUser(key: string){
    if(key != null){
      this.daneRef.snapshotChanges().forEach(changes => {
        changes.forEach(ch => {
          if(ch.payload.key == key){
            this.currentUser.sendCurrentUser(<WebsiteUser>ch.payload.val())
          }
        } )
      })
    }else{
      this.currentUser.sendCurrentUser(null)
    }
  }

  getUsers(){
    return this.daneRef
  }
}
