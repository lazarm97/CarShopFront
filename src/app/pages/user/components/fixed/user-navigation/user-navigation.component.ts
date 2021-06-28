import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnInit {
  userNavigation
  constructor() { }

  ngOnInit(): void {
    this.userNavigation = [
      {
        title : "Rezervacije",
        url : "reservation"
      },
      {
        title : "Moj profil",
        url : "profile"
      }
    ];
  }

}
