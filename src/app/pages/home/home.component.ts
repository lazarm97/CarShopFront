import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CarService } from 'src/app/services/car.service';
import { IMAGE_DIST } from 'src/app/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars:any
  image_dist = IMAGE_DIST
  
  constructor(
    private CarServices : CarService,
    private router : Router,
    private alertifyServices : AlertifyService
  ) { }

  ngOnInit(): void {
    this.CarServices.getCars('1',undefined,undefined,"true").subscribe(
      (res) => (this.cars = res['items']),
      (err) => this.alertifyServices.error("Greška prilikom dohvatanja automobila!")
    );
  }

  onSelectCarDetail(carId){
    this.router.navigate(['/car',carId]);
  }

}
