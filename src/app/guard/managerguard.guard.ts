import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserInteractionServiceService } from '../user-interaction-service.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(public authService: AuthserviceService, public router: Router, public userinteraction: UserInteractionServiceService){
    
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    //not working
    /*  return this.userinteraction.user$.pipe(map(user =>{
      console.log("init")
      if(user.role==3 || user.role==2) { 
        console.log("true")
        return true;
      }
      else if(user.role==1){
        this.router.navigate(['mainmenu']) ; 
        return false;
      }
      this.router.navigate(['login']) ; 
      return false;
    }))*/
    if(this.userinteraction.guardRole==3 || this.userinteraction.guardRole==2)
    return true;
    this.router.navigate(['mainmenu']) ; 
    return false;
  } 
}
