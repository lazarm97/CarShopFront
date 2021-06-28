import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CarService } from '../services/car.service';

@Injectable({
  providedIn: 'root'
})
export class CarResolveGuard implements Resolve<any> {
  constructor(private carService: CarService){}

  resolve(){
    return this.carService.getCars("1");
  }


  
}
