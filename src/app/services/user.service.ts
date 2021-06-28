import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import  jwt_decode  from 'jwt-decode';
import { API_DIST } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient,
    private alertify: AlertifyService
  ) { }

  getUser(userId){
    return this.http.get(API_DIST+'User/'+userId,{
        headers : {"Content-Type":"application/json"}
      });
  }

  editUser(userId, editUserForm){
    var data = {
      "Mobile" : editUserForm.value.mobile,
      "City" : editUserForm.value.city,
      "Street" : editUserForm.value.street
    };

    return this.http.put(API_DIST+'User/'+userId,data,{
      headers : { "Content-Type" : "application/json" }
      });
  }

  getUserId(){
    if(localStorage.getItem('token')){
      let token = (localStorage.getItem('token'));
      let userjson = jwt_decode(token);
      let userId = userjson['UserId'];
      return userId;
    }
  }

  isAdmin(){
    let token = (localStorage.getItem('token'));
    let userjson = jwt_decode(token);
    let userRole = userjson['UserRole'];
    if(userRole == "Admin")
      return true;
    return false;
  }

  isUser(){
    let token = (localStorage.getItem('token'));
    let userjson = jwt_decode(token);
    let userRole = userjson['UserRole'];
    console.log(userRole);
    if(userRole == "Customer")
      return true;
    return false;
  }

  deleteUser(id){
    return this.http.delete(API_DIST+'User/'+id,{
      headers : { "Content-Type" : "application/json" }
      });
  }

  editUserPassword(id,editUserPasswordForm){
    var data = {
      "OldPassword" : editUserPasswordForm.value.currentPassword,
      "NewPassword" : editUserPasswordForm.value.newPassword
    };

    return this.http.put(API_DIST+'User/Password/'+id,data,{
      headers : { "Content-Type" : "application/json" }
      });
  }

  createUserPassword(data){
    return this.http.post(API_DIST+'User/CreatePassword',data,{
      headers : {"Content-Type" : "application/json"}
    });
  }

  getBannedUser(){
    return this.http.get(API_DIST+'User/Ban',{
        headers : {"Content-Type":"application/json"}
      });
  }

  activateBannedUser(userId){
    return this.http.put(API_DIST+'User/BanActivate/'+userId,
    {
      headers : {"Content-Type": "application/json"}
    });
  }
}
