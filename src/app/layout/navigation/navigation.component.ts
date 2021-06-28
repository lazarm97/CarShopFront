import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { API_DIST } from 'src/app/app.constants';
declare var $:any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navigation : any[];
  username
  password
  fname
  lname
  email
  mobile
  city
  street
  RpEmail

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.navigation = [
      {
        title : "Početna",
        url : "/"
      },
      {
        title : "Vozila na placu",
        url : "sell-used-cars"
      }
    ];
  }

  onLogin(loginForm : NgForm){
    var data = {
      "Username" : loginForm.value.username,
      "Password" : loginForm.value.password
    };

    this.http.post(API_DIST+'Token',data,{
      headers : {"Content-Type":"application/json"}
    }).subscribe(
      (response) => {
        if(response != null){
          $('#LogModal').modal('hide');
          this.authService.addUser(response['token']);
          this.alertify.success('Uspešno ste se ulogovali!');
          if(this.isAdmin())
            this.router.navigate(['admin/dashboard/home']);
          else this.router.navigate(['user/dashboard/reservation']);
        }else{
          this.alertify.error('Greška');
        }
      },
      (error) => {
        if(error.error.text != undefined)
          this.alertify.error(error.error.text);
        else
          this.alertify.error('Korisničko ime ili šifra nisu dobri!');
      }
    )
  }

  onResetPassword(resetPasswordForm : NgForm){
    var data = {
      "Email" : resetPasswordForm.value.RpEmail
    };

    this.http.post(API_DIST+'User/ForgotPassword',data,{
      headers : {"Content-Type" : "application/json"}
    }).subscribe(
      res => this.alertify.success("Proverite email! Poslata Vam je poruka sa linkom!"),
      err => this.alertify.error("Greška")
    );
  }

  onRegistration(registrationForm : NgForm){
    var data = {
      "Username" : registrationForm.value.username,
      "Password" : registrationForm.value.password,
      "FirstName" : registrationForm.value.fname,
      "LastName" : registrationForm.value.lname,
      "Email" : registrationForm.value.email,
      "Mobile" : registrationForm.value.mobile,
      "City" : registrationForm.value.city,
      "Street" : registrationForm.value.street,
    };

    this.http.post(API_DIST+'User',data,{
      headers : {"Content-Type":"application/json"}
    }).subscribe(
      (response) => {
        $('#RegistrationModal').modal('hide');
        $('#LogModal').modal('show');
        this.alertify.success("Uspešno ste se registrovali! Možete se ulogovati!");
      },
      (error) => {
        console.log(error);
        this.alertify.error('Greška prilikom registracije!');
      }
    )
  }

  loggedin(){
    return this.authService.loggedIn();
  }

  isAdmin(){
    return this.userService.isAdmin();
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
