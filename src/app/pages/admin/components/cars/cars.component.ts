import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { IMAGE_DIST } from 'src/app/app.constants';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars : any;
  response : object;
  pagination : Array<Int16Array>;
  searchCar = ""
  image_dist = IMAGE_DIST

  constructor(
    private activateRoute: ActivatedRoute,
    private carService : CarService,
    private router : Router,
    private alertifyService : AlertifyService
  ) { }

  ngOnInit(): void {
    this.response = this.activateRoute.snapshot.data['cars'];
    this.cars = this.response['items'];
    this.pagination = new Array(this.response['pagesCount']);
  }

  onPage(page:string){
    this.carService.getCars(page, this.searchCar).subscribe(
      (res) => (
        this.response = res, 
        this.cars = res['items']
        ),
      (err) => console.log(err)
    );
  }

  onNextPage(){
    this.carService.getCars(this.response['currentPage']+1, this.searchCar).subscribe(
      (res) => (
        this.response = res, 
        this.cars = res['items']
        ),
      (err) => console.log(err)
    );
  }

  onPreviousPage(){
    this.carService.getCars(this.response['currentPage']-1, this.searchCar).subscribe(
      (res) => (
        this.response = res, 
        this.cars = res['items']
        ),
      (err) => console.log(err)
    );
  }

  onDeleteCar(id){
    this.carService.deleteCar(id).subscribe(
      response => this.alertifyService.success("Deleted"),
      error => this.alertifyService.error("error")
    );;
  }

  onUpdateCar(id){
    this.router.navigate(["admin/dashboard/update-car",id]);
  }

  onSearchCar(){
    this.carService.getCars(1,this.searchCar).subscribe(
      (res) => (
        this.cars = res['items'],
        this.pagination = new Array(res['pagesCount'])
        ),
      (err) => console.log(err)
    )
  }

  onChangeCar(e){
    this.searchCar = e.target.value;
  }
}
