import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ban-user',
  templateUrl: './ban-user.component.html',
  styleUrls: ['./ban-user.component.css']
})
export class BanUserComponent implements OnInit {

  users
  constructor(
    private userService : UserService,
    private alertifySerice : AlertifyService
  ) { }

  ngOnInit(): void {
    this.userService.getBannedUser().subscribe(
      res => this.users = res['usersBannedDto'],
      err => console.log(err)
    );
  }

  onUserActivate(userId){
    this.userService.activateBannedUser(userId).subscribe(
      res => (
        this.alertifySerice.success("Korisnik je aktiviran!"),
        this.ngOnInit()
      ),
      err => this.alertifySerice.error("Greska prilikom aktiviranja korisnika!")
    )
  }

}
