import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  constructor(
    private carService : CarService,
    private activateRoute: ActivatedRoute,
    private alertify: AlertifyService
    ) { }

  car : any
  modelList
  totalImages=Array(30)
  url=[]
  defaultUrl = "https://www.tuningblog.eu/wp-content/uploads/2018/10/Tuning-BMW-G30-M550i-G-Power-1.jpg"
  freeImagesIndex=Array(this.totalImages.length)
  inputVin = ""
  inputCubic = ""
  inputPower = ""
  inputKm = ""
  inputPrice = ""
  inputDescription
  inputMark
  equipmetnList=[]

  ngOnInit(){
    this.car = this.activateRoute.snapshot.data['newcar'];
    for(let i=0; i<this.totalImages.length; i++){
      this.url[i] = this.defaultUrl;
      this.freeImagesIndex[i] = i;
    }
  }
  
  changeManufacturer(e) {
    console.log(e.target.value);
    this.carService.getModels(e.target.value).subscribe(
      (res) => this.modelList = res['models'],
      (err) => console.log(err)
    );
  }
  changeModel(e) {
    console.log(e.target.value);
    this.formData.set('ModelId', e.target.value);
  }

  changeYear(e){
    this.formData.set('YearOfManufactureId', e.target.value);
  }

  changeCategory(e){
    this.formData.set('CategoryId', e.target.value);
  }

  changeSeat(e){
    this.formData.set('SeatId', e.target.value);
  }

  changeDoor(e){
    this.formData.set('DoorId', e.target.value);
  }

  changeFuel(e){
    this.formData.set('FuelId', e.target.value);
  }

  changeTransmission(e){
    this.formData.set('TransmissionId', e.target.value);
  }

  changeColor(e){
    this.formData.set('ColorId', e.target.value);
  }

  formData = new FormData();
  onselectFile(e){
    if (e.target.files) {
      var filesAmount = e.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[i]);
          reader.onload = (event: any) => {
            for(let j=0; j<this.totalImages.length; j++){
              if(this.freeImagesIndex[j] != -1){
                this.url[j] = event.target.result;
                this.freeImagesIndex[j] = -1;
                this.formData.append('ImagesUploader', e.target.files[i], e.target.files[i].name);
                break;
              }
            }
          }
      }
    }
  }

  onRemoveImage(urlIndex){
    this.removeFormItem(this.formData, urlIndex);
    this.freeImagesIndex[urlIndex] = 1;
    this.url[urlIndex] = this.defaultUrl;
  }

  onUploadCar(){
    this.appendEquipmentsInForm(this.equipmetnList);
    this.formData.set('Vin',this.inputVin);
    this.formData.set('Cubic',this.inputCubic);
    this.formData.set('PowerKw',this.inputPower);
    this.formData.set('CurrentKm',this.inputKm);
    this.formData.set('Description', this.inputMark);
    this.formData.set('Price',this.inputPrice);
    this.formData.set('Note',this.inputDescription);
    this.carService.uploadCar(this.formData).subscribe(
      (res) => this.alertify.success("Automobil je dodat!"),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertify.error(element['ErrorMessage']);
        }))
    );
  }

  removeFormItem(form,index){
    var tmpItems = form.getAll('ImagesUploader');
    form.delete('imagImagesUploaderes');
    for(var i=0; i<tmpItems.length; i++){
      if(i == index)
        continue;
      form.append('ImagesUploader', tmpItems[i], tmpItems[i].name);
    }
  }

  changeSelection(e){
    if(this.equipmetnList.includes(e.target.value) == false){
      this.equipmetnList.push(e.target.value);
    }else{
      let index = this.equipmetnList.indexOf(e.target.value);
      this.equipmetnList.splice(index,1);
    }
  }

  appendEquipmentsInForm(equipments){
    this.formData.delete('Equipments');
    for(var i=0; i<equipments.length; i++){
      this.formData.append('Equipments', equipments[i]);
    }
  }

}
