import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any){
    let tmpUser;
    if(localStorage.getItem('token')){
      tmpUser = JSON.parse(localStorage.getItem('token'));
    }
    return tmpUser.find(p => p.username === user.username);
  }

  addUser(JwtToken: any){
    localStorage.setItem('token', JwtToken);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    return localStorage.getItem('token');
  }
}
