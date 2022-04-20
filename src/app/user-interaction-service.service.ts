import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebsiteUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionServiceService {

  //private currentUser = new BehaviorSubject(WebsiteUser);
  private _currentUser = new Subject<WebsiteUser>();
  user$ = this._currentUser.asObservable()
  guardRole=0;
  //public currentUserObs = this.currentUser.asObservable();

  constructor() { }

  sendCurrentUser(user){
    this._currentUser.next(user)
    if(user==null)
    this.guardRole=0;
    else
    this.guardRole=user.role;
  }}
