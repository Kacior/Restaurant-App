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
export class AdminGuard implements CanActivate {

  constructor(public authService: AuthserviceService, public router: Router, public userinteraction: UserInteractionServiceService){
    
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.userinteraction.guardRole==2)
    return true;
    this.router.navigate(['mainmenu']) ; 
    return false;
  } 
}
