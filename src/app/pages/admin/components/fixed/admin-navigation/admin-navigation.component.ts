import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit {
  adminNavigation : any[];
  constructor() { }

  ngOnInit(): void {
    this.adminNavigation = [
      {
        title : "Početna",
        url : "home"
      },
      {
        title : "Oglasi",
        url : "cars"
      },
      {
        title : "Dodaj oglas",
        url : "new-car"
      },
      {
        title : "Izmeni opcije automobila",
        url : "update-car-options"
      },
      {
        title : "Moj profil",
        url : "profile"
      },
      {
        title : "Banovani korisnici",
        url : "ban-user"
      },
      {
        title : "Rezervacije",
        url : "reservations"
      }
    ];
  }

}
