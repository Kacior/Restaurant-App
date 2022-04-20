import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DishComponent } from './dish/dish.component';
import { DishlistComponent } from './dishlist/dishlist.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { AddformComponent } from './addform/addform.component';
import { RouterModule, Routes } from'@angular/router';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Dish } from './dish/dish';
import { DishlistserverService } from './dishlistserver.service';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'; 
import{ AngularFireDatabaseModule }from'@angular/fire/compat/database';
import {NgxPaginationModule} from 'ngx-pagination';
import { TrolleyComponent } from './trolley/trolley.component';
import { AddreviewComponent } from './addreview/addreview.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminGuard } from './guard/adminguard.guard';
import { ManagerGuard } from './guard/managerguard.guard';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';


const routes: Routes= [
  {path:'', component:MainmenuComponent},
  {path:'mainmenu', component:MainmenuComponent},
  {path: 'dishlist', component:DishlistComponent},
  {path: 'dishlist/:id', component:DishdetailComponent},
  {path: 'adddish', component:UsermenuComponent, canActivate:[ManagerGuard]},
  {path: 'trolley', component:TrolleyComponent, canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'adminpanel', component:AdminpanelComponent, canActivate:[AdminGuard]},
  {path: '404', component: NotFoundComponentComponent},
  {path: '**', redirectTo: '/404'}
]; 

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    DishlistComponent,
    UsermenuComponent,
    AddformComponent,
    MainmenuComponent,
    NavbarComponent,
    DishdetailComponent,
    TrolleyComponent,
    AddreviewComponent,
    LoginComponent,
    AdminpanelComponent
    ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
    ],
  providers: [DishlistserverService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
