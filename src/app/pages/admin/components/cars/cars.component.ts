import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars : any;
  response : object;

  constructor(
    private activateRoute: ActivatedRoute,
    private carService : CarService
  ) { }

  ngOnInit(): void {
    this.response = this.activateRoute.snapshot.data['cars'];
    this.cars = this.response['items'];
    console.log(this.response);
  }

}
