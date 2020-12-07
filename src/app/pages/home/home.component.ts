import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { tokenName } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
              private authService: AuthService,
              private alertify: AlertifyService,
              private http: HttpClient,
              private router: Router
              ) { }

  ngOnInit(): void {
  }

  onLogin(loginForm : NgForm){
    var formData : any = new FormData();
    formData.append("email", loginForm.value.email);
    formData.append("password", loginForm.value.password);
    var data = {
      "Email" : loginForm.value.email,
      "Password" : loginForm.value.password
    };

    this.http.post('http://localhost:5101/api/Token',data,{
      headers : {"Content-Type":"application/json"}
    }).subscribe(
      (response) => {
        //response treba da vrati korisnika ili gresku, tako da ce biti provera drugacija a ne da li je null
        if(response != null){
          this.authService.addUser(response['token']);
          this.alertify.success('success');
          this.router.navigate(['admin/dashboard']);
        }else{
          this.alertify.error('error');
        }
      },
      (error) => {
        this.alertify.error('Username or password was invalid!');
      }
    )
  }

}
