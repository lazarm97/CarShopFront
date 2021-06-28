import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_DIST } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http : HttpClient
  ) { }


  getNewReservationInfo(carId,userId){
    return this.http.get(API_DIST+'Help/NewReservation',{
        headers : {"Content-Type":"application/json"},
        params : {
          'IdCar' : carId,
          'IdUser' : userId
        }
      });
  }

  createNewReservation(carId,userId,datetime){
    return this.http.post(API_DIST+'Reservation',
    {
      'userId' : userId,
      'carId' : carId,
      'datetime' : datetime
    },
    {
      headers: {'Content-Type':'application/json'}
    }
    );
  }

  getUserReservations(userId){
    return this.http.get(API_DIST+'Reservation/UserReservations',{
      headers : {"Content-type" : "application/json"},
      params : {
        'IdUser' : userId 
      }
    })
  }

  getReservations(onlyExpired="false"){
    return this.http.get(API_DIST+'Reservation',{
      headers : {"Content-type" : "application/json"},
      params : {
        'onlyExpired' : onlyExpired
      }
    })
  }

  cancelReservation(id){
    return this.http.put(API_DIST+'Reservation',
      {
        'Id':id,
        'Action':'Cancel'
      }
    );
  }

  stateReservation(id,state){
    return this.http.put(API_DIST+'Reservation',
      {
        'Id':id,
        'Action':state
      }
    );
  }

  getReservationsStatistic(){
    return this.http.get(API_DIST+'Reservation/Statistic',{
      headers : {"Content-type" : "application/json"}
    })
  }
}
