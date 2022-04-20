import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../authservice.service';
import { map } from 'rxjs/operators';
import { UserInteractionServiceService } from '../user-interaction-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthserviceService, public router: Router, public userinteraction: UserInteractionServiceService){
    
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.authService.authState$.pipe(map(state =>{
      if(state !== null) { 
        return true;
      }
      this.router.navigate(['login']) ; 
      return false;
    }))
  } 
}
