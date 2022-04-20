import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { UserInteractionServiceService } from './user-interaction-service.service';
import { WebsiteUser } from './user';
import firebase from '@firebase/app-compat';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  isLoggedIn = false;
  loggedInSource = new BehaviorSubject(false);
  loggedInObs = this.loggedInSource.asObservable();
  currentUserSource = new BehaviorSubject("");
  currentUserObs = this.currentUserSource.asObservable();
  readonly authState$: Observable <any> = this.firebaseAuth.authState


  constructor(public firebaseAuth: AngularFireAuth, public userservice: UserserviceService, public currentuser: UserInteractionServiceService, public router: Router ) {
    firebaseAuth.authState.subscribe(auth =>{
      if(auth){
      this.isLoggedIn=true;
      this.loggedInSource.next(this.isLoggedIn)
      this.updateUser();
      }
      else{
        this.isLoggedIn=false;
        this.loggedInSource.next(this.isLoggedIn)
        this.updateUser();
      }
    }

    )
   }

  async singin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res=>{
    //  this.isLoggedIn = true;
    //  this.loggedInSource.next(this.isLoggedIn)
      localStorage.setItem('user', JSON.stringify(res.user))
      this.currentUserSource.next(email)
    })
    this.router.navigate(['mainmenu']);
    this.updateUser();
  }

  async singup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res=>{
    //  this.isLoggedIn = true;
    //  this.loggedInSource.next(this.isLoggedIn)
      var uid = firebase.auth().currentUser?.uid;
      var user = new WebsiteUser(email, 1, uid)
      this.userservice.createUser(uid, user)
      localStorage.setItem('user', JSON.stringify(res.user))
      this.currentUserSource.next(email)
    })
    this.router.navigate(['mainmenu']);
    this.updateUser();
  }

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user');
    this.isLoggedIn=false;
    this.loggedInSource.next(this.isLoggedIn)
    this.currentUserSource.next("")
    this.updateUser();
  }

  changePersistence(mode: string){
    var session:any
    if(mode === "session"){
       session = firebase.auth.Auth.Persistence.SESSION; 
    }
    else if (mode === "none"){
     session = firebase.auth.Auth.Persistence.NONE; 
    }
    else{
     session = firebase.auth.Auth.Persistence.LOCAL; 
    }
    return this.firebaseAuth.setPersistence(session).then(() => {
     
     });
  }

  updateUser(){
    var key;
    if (firebase.auth().currentUser != null){
      key = firebase.auth().currentUser?.uid;
    }else{
      key = null;
    }
    this.userservice.getUser(key);
  }
}
