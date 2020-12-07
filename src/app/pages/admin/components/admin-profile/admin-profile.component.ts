import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { AddressService } from 'src/app/services/address.service';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  user: any;
  idAddress;
  idMobile;
  selectedMobiles:string[];
  selectedAddresses:string[];
  constructor(
    private activateRoute: ActivatedRoute,
    private addressService : AddressService,
    private mobileService : MobileService
  ) { }

  ngOnInit() {
    this.user = this.activateRoute.snapshot.data['user'];
    this.selectedAddresses = new Array<string>();
    this.selectedMobiles = new Array<string>();
  }

  onAddAddress(addAddressForm : NgForm) {
    this.addressService.createAddress(addAddressForm, this.user.id);

  }

  onDeleteAddress(){
    this.addressService.deleteAddress(this.idAddress);
  }

  onDeleteAddressId(id){
    this.idAddress = id;
  }

  getAddressId(e:any,id:string){
    if(e.target.checked){
      this.selectedAddresses.push(id);
    }else{
      this.selectedAddresses = this.selectedAddresses.filter(x => x != id);
    }
    console.log(this.selectedAddresses);
  }

  onAddMobile(addMobileForm : NgForm) {
    this.mobileService.createMobile(addMobileForm, this.user.id);

  }

  onDeleteMobile(){
    this.mobileService.deleteMobile(this.idMobile);
  }

  onDeleteMobileId(id){
    this.idMobile = id;
  }

  getMobileId(e:any,id:string){
    if(e.target.checked){
      this.selectedMobiles.push(id);
    }else{
      this.selectedMobiles = this.selectedMobiles.filter(x => x != id);
    }
    console.log(this.selectedMobiles);
  }

}
