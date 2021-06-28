import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CarService } from 'src/app/services/car.service';
declare var $:any

@Component({
  selector: 'app-update-car-options',
  templateUrl: './update-car-options.component.html',
  styleUrls: ['./update-car-options.component.css']
})
export class UpdateCarOptionsComponent implements OnInit {
  option
  action
  options
  models
  modelId
  optionValue
  txtOption

  constructor(
    private AlertifyService : AlertifyService,
    private CarService : CarService
  ) { }

  ngOnInit(): void {
    $('#txtOption').hide();
    $('#btnSubmit').hide();
    $('#optionValue').hide();
    $('#optionModel').hide();
  }

  changeOption(e){
    this.option = e;
    this.changeAction("0");
    switch(this.option){
      case "Brand":
        $('#optionModel').hide();
        this.CarService.getManufacturers().subscribe(
          res => this.options = res['brands']
        );
        break;
      case "Color":
        $('#optionModel').hide();
        this.CarService.getColors().subscribe(
          res => this.options = res['colors']
        );
        break;
      case "Model":
        this.CarService.getManufacturers().subscribe(
          res => this.options = res['brands']
        );
        break;
    }
  }

  changeAction(e){
    this.action = e;
    if(this.option == undefined || this.option == "0"){
      this.AlertifyService.warning("Morate prvo izabrati opciju!");
    }else{
      switch(this.action){
        case "Add":
          if(this.option == "Model")
            $('#optionValue').show();
          else
            $('#optionValue').hide();
          $('#optionModel').hide();
          $('#txtOption').show();
          $('#btnSubmit').show();
          break;
        case "Delete":
          if(this.option == "Model")
            $('#optionModel').show();
          else
            $('#optionModel').hide();
          $('#txtOption').hide();
          $('#optionValue').show();
          $('#btnSubmit').show();
          break;
        case "Edit":
          if(this.option == "Model")
            $('#optionModel').show();
          else
            $('#optionModel').hide();
          $('#txtOption').show();
          $('#btnSubmit').show();
          $('#optionValue').show();
          break;
        case "0":
          $('#changeAction').val("0");
          $('#txtOption').hide();
          $('#btnSubmit').hide();
          $('#optionValue').hide();
          $('#optionModel').hide();
          break;
      }
    }
  }

  changeOptionValue(e){
    this.optionValue = e;
    console.log(e);
    this.CarService.getModels(e).subscribe(
      res => this.models = res['models']
    );
  }

  changeModel(e){
    this.modelId = e;
  }

  onSubmit(){
    console.log(this.txtOption);
    if(this.action == "Delete"){
      switch(this.option){
        case "Brand":
          this.CarService.deleteBrand(this.optionValue).subscribe(
            res => this.AlertifyService.success("Uspešno obrisana marka!"),
            err => this.AlertifyService.error("Greška prilikom brisanja marke!")
          );
          break;
        case "Model":
          this.CarService.deleteModel(this.modelId).subscribe(
            res => this.AlertifyService.success("Uspešno obrisan model!"),
            err => this.AlertifyService.error("Greška prilikom brisanja modela!")
          );
          break;
        case "Color":
          this.CarService.deleteColor(this.optionValue).subscribe(
            res => this.AlertifyService.success("Uspešno obrisana boja!"),
            err => this.AlertifyService.error("Greška prilikom brisanja boje!")
          );
          break;
      }
    }else if(this.action == "Add"){
      switch(this.option){
        case "Brand":
          this.CarService.addBrand(this.txtOption).subscribe(
            res => this.AlertifyService.success("Uspešno dodata marka!"),
            err => this.AlertifyService.error("Greška prilikom dodavanja marke!")
          );
          break;
        case "Model":
          this.CarService.addModel(this.optionValue, this.txtOption).subscribe(
            res => this.AlertifyService.success("Uspešno dodat model!"),
            err => this.AlertifyService.error("Greška prilikom dodavanja modela!")
          );
          break;
        case "Color":
          this.CarService.addColor(this.txtOption).subscribe(
            res => this.AlertifyService.success("Uspesno dodata boja!"),
            err => this.AlertifyService.error("Greska prilikom dodavanja boje!")
          );
          break;
      }
    }else if(this.action == "Edit"){
      switch(this.option){
        case "Brand":
          this.CarService.editBrand(this.optionValue,this.txtOption).subscribe(
            res => this.AlertifyService.success("Uspešno izmenjena marka!"),
            err => this.AlertifyService.error("Greška prilikom izmene marke!")
          );
          break;
        case "Model":
          this.CarService.editModel(this.modelId, this.txtOption).subscribe(
            res => this.AlertifyService.success("Uspešno izmenjen model!"),
            err => this.AlertifyService.error("Greška prilikom izmene modela!")
          );
          break;
        case "Color":
          this.CarService.editColor(this.optionValue,this.txtOption).subscribe(
            res => this.AlertifyService.success("Uspešno izmenjena boja!"),
            err => this.AlertifyService.error("Greška prilikom izmene boje!")
          );
          break;
      }
    }
  }
}
