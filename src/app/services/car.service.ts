import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { API_DIST } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(
    private http : HttpClient,
    private alertify: AlertifyService
  ) { }

  getCars(page,search="",filter="", recentAdded="false",brand="-1",model="-1",yearFrom="-1",yearTo="-1",category="-1",doors="-1",fuel="-1",priceFrom="-1",priceTo="-1"){
    return this.http.get(API_DIST+'Car',{
        headers : {"Content-Type":"application/json"},
        params : {
          'Page' : page,
          'CarName' : search,
          'CarFilter' : filter,
          'RecentAdded' : recentAdded,
          'IdBrand' : brand,
          'IdModel' : model,
          'IdYearFrom' : yearFrom,
          'IdYearTo' : yearTo,
          'IdCategory' : category,
          'IdDoors' : doors,
          'IdFuel' : fuel,
          'PriceFrom' : priceFrom,
          'PriceTo' : priceTo
        }
      });
  }

  getCar(carId){
    return this.http.get(API_DIST+'Car/'+carId,
    {
      headers : {"Content-Type":"application/json"}
    });
  }

  deleteCar(carId){
    return this.http.delete(API_DIST+'Car/'+carId
    );
  }

  getManufacturers(){
    return this.http.get(API_DIST+'Brand',{
        headers : {"Content-Type":"application/json"}
      });
  }

  getColors(){
    return this.http.get(API_DIST+'Color',{
        headers : {"Content-Type":"application/json"}
      });
  }

  getModels(brandId){
    return this.http.get(API_DIST+'Model',{
        headers : {"Content-Type":"application/json"},
        params : {'BrandId' : brandId}
      });
  }

  getFuels(){
    return this.http.get(API_DIST+'Fuel',{
        headers : {"Content-Type":"application/json"}
      });
  }

  getCategories(){
    return this.http.get(API_DIST+'Category',{
        headers : {"Content-Type":"application/json"}
      });
  }

  getYearsOfManufacturer(){
    return this.http.get(API_DIST+'YearOfManufacturer',{
        headers : {"Content-Type":"application/json"}
      });
  }

  getNewCarInfo(){
    return this.http.get(API_DIST+'Help/NewCar',{
        headers : {"Content-Type":"application/json"}
      });
  }

  uploadCar(formData){
    return this.http.post(API_DIST+'Car/Images',formData
    );
  }

  updateCar(formData,carId){
    return this.http.put(API_DIST+'Car/'+carId,formData
    );
  }

  deleteColor(colorId){
    return this.http.delete(API_DIST+'Color/'+colorId
    );
  }

  deleteBrand(brandId){
    return this.http.delete(API_DIST+'Brand/'+brandId
    );
  }

  deleteModel(modelId){
    return this.http.delete(API_DIST+'Model/'+modelId
    );
  }

  addModel(brandId,name){
    return this.http.post(API_DIST+'Model',{
      'brandId' : brandId,
      'name' : name
    },{
      headers : {"Content-Type":"application/json"}
    });
  }

  addBrand(name){
    return this.http.post(API_DIST+'Brand',{
      'name' : name
    },{
      headers : {"Content-Type":"application/json"}
    });
  }

  addColor(name){
    return this.http.post(API_DIST+'Color',{
      'name' : name
    },{
      headers : {"Content-Type":"application/json"}
    });
  }

  editModel(modelId,name){
    return this.http.put(API_DIST+'Model/'+modelId,{
      'name' : name
    },{
      headers : {"Content-Type":"application/json"}
    });
  }

  editBrand(brandId,name){
    return this.http.put(API_DIST+'Brand/'+brandId,{
      'name' : name,
      'brandId' : brandId
    },{
      headers : {"Content-Type":"application/json"}
    });
  }

  editColor(colorId,name){
    return this.http.put(API_DIST+'Color/'+colorId,{
      'name' : name
    },{
      headers : {"Content-Type":"application/json"}
    });
  }
}
