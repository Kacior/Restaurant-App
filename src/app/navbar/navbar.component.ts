import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { WebsiteUser } from '../user';
import { UserInteractionServiceService } from '../user-interaction-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn = false;
  currentUser="test";
  currentRole=0;

  constructor(public authService: AuthserviceService, public userinteraction: UserInteractionServiceService) {
   }

  ngOnInit(): void {
    this.authService.loggedInObs.subscribe(flag => this.isLoggedIn=flag)
    //this.authService.currentUserObs.subscribe(user => this.currentUser=user)
    this.userinteraction.user$.subscribe(
      u => {
        if (u != null){
          this.currentUser = u.email
          this.currentRole = u.role
        }else{
          //this.currentUser = null;
          this.currentRole = 0
        }
      }
    )
  }

  handleLogout(){
    this.authService.logout()
  }
}
