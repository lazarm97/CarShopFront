import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http : HttpClient
  ) { }

  getCars(){
    return this.http.get('http://localhost:5101/api/Car',{
        headers : {"Content-Type":"application/json"}
      });
  }
}
