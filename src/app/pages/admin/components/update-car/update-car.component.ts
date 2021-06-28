import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  constructor(
    private carService : CarService,
    private activateRoute: ActivatedRoute,
    private alertify: AlertifyService,
    private fb: FormBuilder) { }

  carId
  carInfo:any
  car:any
  modelList
  totalImages=Array(30)
  url=[]
  defaultUrl = "https://www.tuningblog.eu/wp-content/uploads/2018/10/Tuning-BMW-G30-M550i-G-Power-1.jpg"
  freeImagesIndex=Array(this.totalImages.length)
  inputVin
  inputCubic
  inputPower
  inputKm
  inputPrice
  inputDescription
  inputMark
  equipmetnList=[]
  manufacturer
  carForm: FormGroup;
  formData = new FormData();
  existImages=[]

  ngOnInit() {
    this.carId = parseInt(this.activateRoute.snapshot.paramMap.get('id'));
    this.carInfo = this.activateRoute.snapshot.data['newcar'];
    
    this.carForm = this.fb.group({
      carManufacturer: 0,
      carModel: 0,
      carYearOfManufacturer : 0,
      carCategory : 0,
      carVin: "asd",
      carCubic: 0,
      carPower: 0,
      carKm: 0,
      carSeat: 0,
      carDoor: 0,
      carFuel: 0,
      carTransmission: 0,
      carColor: 0,
      carPrice: 0,
      carNote: "asd",
      carMark: "asd"
    })
    this.carService.getCar(this.carId).subscribe(
      (res) => (this.car = res,
        this.getModels(res['brandId']),
        console.log(this.car),
        this.equipmetnList = res['equipmentsId'],
        this.equipmentsToString(),
        this.setDefaultImages(this.car.images),
        this.inputVin = this.car.vin,
        this.inputCubic = this.car.cubic,
        this.inputPower = this.car.powerKw,
        this.inputKm = this.car.currentKm,
        this.inputPrice = this.car.price,
        this.inputDescription = this.car.note,
        this.inputMark = this.car.description,
        this.formData.set('ColorId', this.car.colorId),
        this.formData.set('TransmissionId', this.car.transmissionId),
        this.formData.set('FuelId', this.car.fuelId),
        this.formData.set('DoorId', this.car.doorId),
        this.formData.set('SeatId', this.car.seatId),
        this.formData.set('CategoryId', this.car.categoryId),
        this.formData.set('YearOfManufactureId', this.car.yearOfManufacturerId),
        this.formData.set('ModelId', this.car.modelId),
        this.carForm = this.fb.group({
          carManufacturer: this.car.brandId,
          carModel: this.car.modelId,
          carYearOfManufacturer : this.car.yearOfManufacturerId,
          carCategory : this.car.categoryId,
          carVin : this.car.vin,
          carCubic: this.car.cubic,
          carPower: this.car.powerKw,
          carKm: this.car.currentKm,
          carSeat : this.car.seatId,
          carDoor: this.car.doorId,
          carFuel: this.car.fuelId,
          carTransmission: this.car.transmissionId,
          carColor: this.car.colorId,
          carPrice: this.car.price,
          carNote: this.car.note,
          carMark : this.car.description
        })
        ),
        (err) => console.log(err)
        )    
        for(let i=0; i<this.totalImages.length; i++){
          this.url[i] = this.defaultUrl;
          this.freeImagesIndex[i] = i;
        }
      }

  equipmentsToString(){
    for(let i=0; i<this.equipmetnList.length; i++){
      this.equipmetnList[i] = ''+this.equipmetnList[i];
    }
  }

  setDefaultImages(images){
    for(let i=0; i<images.length; i++){
      this.url[i] = "http://localhost:5101/Images/"+images[i];
      this.freeImagesIndex[i] = -1;
      this.existImages.push(images[i]);
    }
    console.log(this.existImages);
  }

  getModels(id){
    this.carService.getModels(id).subscribe(
      (res) => this.modelList = res['models'],
      (err) => console.log(err)
    );
  }

  changeManufacturer(e) {
    console.log(e.target.value);
    this.getModels(e.target.value);
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

  onRemoveImage(urlIndex,image){
    image = image.substr(29);
    this.removeFormItem(this.formData, urlIndex);
    this.freeImagesIndex[urlIndex] = 1;
    this.url[urlIndex] = this.defaultUrl;
    if(this.existImages.includes(image)){
      var tmp = [];
      for(let i=0, j=0; i<this.existImages.length; i++){
        if(this.existImages[i] != image)
         tmp.push(this.existImages[i]);
         j++;
      }
      this.existImages = tmp;
    }
  }

  onUpdateCar(){
    this.appendExistImagesInForm(this.existImages);
    this.appendEquipmentsInForm(this.equipmetnList);
    this.formData.set('Vin',this.inputVin);
    this.formData.set('Cubic',this.inputCubic);
    this.formData.set('PowerKw',this.inputPower);
    this.formData.set('CurrentKm',this.inputKm);
    this.formData.set('Price',this.inputPrice);
    this.formData.set('Note',this.inputDescription);
    this.formData.set('Description', this.inputMark);
    this.carService.updateCar(this.formData,this.carId).subscribe(
      (res) => this.alertify.success("Uspešno ste izmenuli automobil!"),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertify.error(element['ErrorMessage']);
        })
    ));
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
    console.log(this.equipmetnList);
  }

  appendEquipmentsInForm(equipments){
    this.formData.delete('Equipments');
    for(var i=0; i<equipments.length; i++){
      this.formData.append('Equipments', equipments[i]);
    }
  }

  appendExistImagesInForm(images){
    this.formData.delete('ExistImages');
    for(var i=0; i<images.length; i++){
      this.formData.append('ExistImages', images[i]);
    }
  }

}
