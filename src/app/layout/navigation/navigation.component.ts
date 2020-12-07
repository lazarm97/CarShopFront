import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navigation : any[];

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.navigation = [
      {
        title : "Početna",
        url : "/"
      },
      {
        title : "Prodaja polovnih vozila",
        url : "sell-used-cars"
      },
      {
        title : "Transport",
        url : "transport"
      },
      {
        title : "Vozilo",
        url : "car"
      }
    ];
  }

  loggedin(){
    return localStorage.getItem('token');
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
