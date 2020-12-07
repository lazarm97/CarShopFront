import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) { }

  getUser(userId){
    return this.http.get('http://localhost:5101/api/User/'+userId,{
        headers : {"Content-Type":"application/json"}
      });
  }
}
