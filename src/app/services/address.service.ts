import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { UserService } from './user.service';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
  ) { }


  createAddress(addAddressForm, userId) {
    // var formData: any = new FormData();
    // formData.append("city", addAddressForm.value.city);
    // formData.append("street", addAddressForm.value.street);
    var data = {
      "AdminId": userId,
      "City": addAddressForm.value.city,
      "Street": addAddressForm.value.street
    };

    this.http.post('http://localhost:5101/api/Address', data, {
      headers: { "Content-Type": "application/json" }
    }).subscribe(
      response => this.alertify.success("Success"),
      error => this.alertify.error("Error")
    )
  }

  deleteAddress(addressId){
    this.http.delete('http://localhost:5101/api/Address/'+addressId
    ).subscribe(
      response => this.alertify.success("Deleted"),
      error => this.alertify.error("error")
    );
  }

  editAddress(addressId, editAddressForm){
    var data = {
      "City" : editAddressForm.value.city,
      "Street" : editAddressForm.value.street
    };

    this.http.put('http://localhost:5101/api/Address/'+addressId,data,{
      headers : { "Content-Type" : "application/json" }
      }).subscribe(
        response => this.alertify.success("Success"),
        error => this.alertify.error("Error")
      )
  }
}
