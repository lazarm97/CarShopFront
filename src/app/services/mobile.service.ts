import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
  ) { }


  createMobile(addMobileForm, userId) {
    // var formData: any = new FormData();
    // formData.append("city", addAddressForm.value.city);
    // formData.append("street", addAddressForm.value.street);
    var data = {
      "AdminId": userId,
      "Number": addMobileForm.value.number
    };

    this.http.put('http://localhost:5101/api/Mobile', data, {
      headers: { "Content-Type": "application/json" }
    }).subscribe(
      response => this.alertify.success("Success"),
      error => this.alertify.error("Error")
    )
  }

  deleteMobile(mobileId){
    this.http.delete('http://localhost:5101/api/Mobile/'+mobileId
    ).subscribe(
      response => this.alertify.success("Deleted"),
      error => this.alertify.error("error")
    );
  }
}
