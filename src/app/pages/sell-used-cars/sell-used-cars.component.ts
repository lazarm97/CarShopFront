import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { __spreadArrays } from 'tslib';
import { IMAGE_DIST } from 'src/app/app.constants';

@Component({
  selector: 'app-sell-used-cars',
  templateUrl: './sell-used-cars.component.html',
  styleUrls: ['./sell-used-cars.component.css']
})
export class SellUsedCarsComponent implements OnInit {
  cars : any;
  response : object;
  pagination : Array<Int16Array>;
  searchCar = ""
  filters : any
  currentSortFilter
  modelList
  formData = new FormData();
  car : any
  priceFrom
  priceTo
  brand
  model
  yearFrom
  yearTo
  category
  doors
  fuel
  image_dist = IMAGE_DIST

  constructor(private activateRoute: ActivatedRoute,
    private carService : CarService,
    private userService : UserService,
    private authService : AuthService,
    private alertifyService : AlertifyService,
    private router : Router) { }

  ngOnInit(): void {
    this.carService.getNewCarInfo().subscribe(
      (res) => this.car = res
    );
    this.response = this.activateRoute.snapshot.data['cars'];
    this.cars = this.response['items'];
    this.pagination = new Array(this.response['pagesCount']);
    this.filters = [
      {
        id : "title-desc",
        value : "Nazivu opadajuće"
      },
      {
        id : "title-asc",
        value : "Nazivu rastuće"
      },
      {
        id : "price-desc",
        value : "Ceni opadajuće"
      },
      {
        id : "price-asc",
        value : "Ceni rastuće"
      }
    ];
  }

  onNextPage(){
    this.cars.filter(res => {return res});
    this.carService.getCars(this.response['currentPage']+1, this.searchCar, this.currentSortFilter,undefined,this.brand,this.model,this.yearFrom,this.yearTo,this.category,this.doors,this.fuel,this.priceFrom,this.priceTo).subscribe(
      (res) => (
        this.response = res,
        this.cars = res['items']
      ),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

  onPreviousPage(){
    this.carService.getCars(this.response['currentPage']-1, this.searchCar, this.currentSortFilter,undefined,this.brand,this.model,this.yearFrom,this.yearTo,this.category,this.doors,this.fuel,this.priceFrom,this.priceTo).subscribe(
      (res) => (
        this.response = res,
        this.cars = res['items']
        ),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

  onSelectCarDetail(carId){
    this.router.navigate(['/car',carId]);
  }

  onSelectReservation(carId){
    if(this.authService.loggedIn())
      if(this.userService.isUser())
        this.router.navigate(['/new-reservation', carId]);
      else
        this.alertifyService.warning("Nemate ovlašćenja za rezervaciju!");
    else
      this.alertifyService.warning("Morate biti ulogovani!");
  }

  onPage(page:string){
    this.carService.getCars(page, this.searchCar, this.currentSortFilter,undefined,this.brand,this.model,this.yearFrom,this.yearTo,this.category,this.doors,this.fuel,this.priceFrom,this.priceTo).subscribe(
      (res) => (
        this.response = res, 
        this.cars = res['items']
        ),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

  onSearchCar(){
    this.carService.getCars(1,this.searchCar, this.currentSortFilter,undefined,this.brand,this.model,this.yearFrom,this.yearTo,this.category,this.doors,this.fuel,this.priceFrom,this.priceTo).subscribe(
      (res) => (
        this.response = res,
        this.cars = res['items'],
        this.pagination = new Array(res['pagesCount'])
        ),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    )
  }

  onChangeCar(e){
    this.searchCar = e.target.value;
  }

  onChangeSort(e){
    this.currentSortFilter = e.target.value;
    this.carService.getCars(this.response['currentPage'],this.searchCar,this.currentSortFilter,undefined,this.brand,this.model,this.yearFrom,this.yearTo,this.category,this.doors,this.fuel,this.priceFrom,this.priceTo).subscribe(
      (res) => (
        this.response = res, 
        this.cars = res['items']
        ),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

  changeManufacturer(e) {
    console.log(e.target.value);
    this.carService.getModels(e.target.value).subscribe(
      (res) => (this.modelList = res['models'],this.model = 0),
      (err) => this.alertifyService.error("Greška")
    );
    this.brand = e.target.value;
  }
  changeModel(e) {
    console.log(e.target.value);
    this.formData.set('ModelId', e.target.value);
    this.model = e.target.value;
  }

  changeYearTo(e){
    this.yearTo = e.target.value;
    this.formData.set('YearOfManufactureId', e.target.value);
  }

  changeYearFrom(e){
    this.yearFrom = e.target.value;
    this.formData.set('YearOfManufactureId', e.target.value);
  }

  changeCategory(e){
    this.category = e.target.value;
    this.formData.set('CategoryId', e.target.value);
  }

  changeDoor(e){
    this.doors = e.target.value;
    this.formData.set('DoorId', e.target.value);
  }

  changeFuel(e){
    this.fuel = e.target.value;
    this.formData.set('FuelId', e.target.value);
  }

  onDetailingSearchCar(){
    if(this.priceFrom == "")
      this.priceFrom = undefined;
    if(this.priceTo == "")
      this.priceTo = undefined;

    this.carService.getCars(1,undefined,this.currentSortFilter,undefined,this.brand,this.model,this.yearFrom,this.yearTo,this.category,this.doors,this.fuel,this.priceFrom,this.priceTo)
    .subscribe(
      (res) => 
        (
          this.response = res,
          this.cars = res['items'],
          this.pagination = new Array(res['pagesCount'])
        ),
      (err) => this.alertifyService.error("Greška")
    )
  }
}
