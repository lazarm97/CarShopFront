import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  user: any;
  mobile
  city
  street
  
  constructor(
    private activateRoute: ActivatedRoute,
    private userService : UserService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.user = this.activateRoute.snapshot.data['user'];
    this.mobile = this.user.mobile;
    this.city = this.user.address.city;
    this.street = this.user.address.street;
  }

  onEditUser(editUserForm : NgForm){
    this.userService.editUser(this.user.id,editUserForm).subscribe(
      response => this.alertifyService.success("Uspešno su sačuvani podaci!"),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

}
