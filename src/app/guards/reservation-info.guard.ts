import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationInfoGuard implements Resolve<any> {
  constructor(
    private reservationService: ReservationService,
    private userService: UserService
    ){}
  
  resolve(route: ActivatedRouteSnapshot){
    var userId = this.userService.getUserId();
    var carId = route.params['id'];
    return this.reservationService.getNewReservationInfo(carId,userId);
  }


  
}
