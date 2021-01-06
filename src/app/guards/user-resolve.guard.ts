import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import  jwt_decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserResolveGuard implements Resolve<any> {
  
  constructor(private userService: UserService){}

  resolve(){
    //smisliti sta ako nije setovan token
    if(localStorage.getItem('token')){
      let token = (localStorage.getItem('token'));
      let userjson = jwt_decode(token);
      let userId = userjson['AdminId'];
      return this.userService.getUser(userId);
    }
  }
  
}
