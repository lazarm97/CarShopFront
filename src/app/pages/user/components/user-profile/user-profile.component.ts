import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
declare var $:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  mobile
  city
  street
  newPassword
  currentPassword
  rNewPassword
  
  constructor(
    private activateRoute: ActivatedRoute,
    private userService : UserService,
    private alertifyService: AlertifyService,
    private router : Router
  ) { }

  ngOnInit() {
    this.user = this.activateRoute.snapshot.data['user'];
    this.mobile = this.user.mobile;
    this.city = this.user.address.city;
    this.street = this.user.address.street;
  }

  onEditUser(editUserForm : NgForm){
    this.userService.editUser(this.user.id,editUserForm).subscribe(
      response => (
        this.alertifyService.success("Uspešno ste izmenuli podatke!"),
        this.ngOnInit()
      ),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

  onDeleteUser(){
    this.userService.deleteUser(this.user.id).subscribe(
      (res) => (
        this.alertifyService.success("Nalog obrisan!"),
        localStorage.removeItem('token'),
        $('#deleteUserModal').modal('hide'),
        this.router.navigate(['/'])
      ),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    )
  }

  onEditUserPassword(onEditUserPasswordForm : NgForm){
    this.userService.editUserPassword(this.user.id,onEditUserPasswordForm).subscribe(
      response => (
        this.alertifyService.success("Uspešno ste promenuli šifru!"),
        this.ngOnInit()
      ),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }
}
