import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user
  token
  email
  password
  RpPassword

  constructor(
    private activatedRoute : ActivatedRoute,
    private alertify: AlertifyService,
    private userService : UserService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.user = params['user'];
      this.token = params['token']; 
  });
   }

  ngOnInit(): void {
    this.email = this.user;
  }

  onNewPassword(form : NgForm){
    var data = {
      "Email" : this.user,
      "Password" : form.value.password,
      "Token" : this.token
    };

    this.userService.createUserPassword(data).subscribe(
      res => (
        this.alertify.success("Uspesno ste resetovali lozinku!"),
        this.router.navigate([''])
      ),
      err => this.alertify.error(err)
    );
  }
}
