import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import {NgxGalleryImageSize, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { AlertifyService } from 'src/app/services/alertify.service';
import { IMAGE_DIST } from 'src/app/app.constants';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  car : object;
  carId
  itemsPerRow = new Array(3)
  equipments : any

  constructor(
    private activateRoute: ActivatedRoute,
    private carService : CarService,
    private alertifyService : AlertifyService) { }
    
    ngOnInit(): void {
      this.galleryOptions = [
        {
          width: '100%',
          height: '500px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          previewFullscreen: true
        },
        {
          breakpoint: 800,
          width: '100%',
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
          lazyLoading: true,
          imageSize: NgxGalleryImageSize.Contain
        },
        {
          breakpoint: 400,
          preview: false
        }
      ];
      
      this.galleryImages = [
        
      ];

      this.carId = parseInt(this.activateRoute.snapshot.paramMap.get('id'));
      this.carService.getCar(this.carId).subscribe(
        (res) => (
          this.car = res,
          this.addImages(res['images']),
          this.equipmentsArray()
        ),
        (err) => this.alertifyService.error("Greska prilikom dohvatanja informacija o vozilu!")
      )
    }

    addImages(images) {
      for(let i=0; i<images.length; i++){
        this.galleryImages[i] = {
          "small": IMAGE_DIST+images[i],
          "medium": IMAGE_DIST+images[i],
          "big": IMAGE_DIST+images[i]
        };
      }
    }

    equipmentsArray(){
      var index = 0;
      var x = [];
      var duzina = Math.ceil(this.car['equipments'].length / 3);
      var y = new Array(duzina);
      y = [];
      for(let i=0; i<duzina; i++){
        x = [];
        for(let j=0; j<3; j++){
          if(index < this.car['equipments'].length){
            x.push(this.car['equipments'][index]);
            index++;
          }
        }
        y.push(x);
      }
      this.equipments = y;
    }  
  }
