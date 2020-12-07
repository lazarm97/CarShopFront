import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavigationComponent } from './components/fixed/admin-navigation/admin-navigation.component';
import { AdminHomeComponent } from './components/home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-rooting.module';
import { CarsComponent } from './components/cars/cars.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { ResolveGuard } from 'src/app/guards/resolve.guard';

@NgModule({
  declarations: [
    AdminNavigationComponent,
    AdminHomeComponent,
    CarsComponent,
    NewCarComponent,
    AdminProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  exports: [
    AdminNavigationComponent,
    AdminRoutingModule
  ],
  bootstrap: [
    AdminNavigationComponent
  ],
  providers : [
    ResolveGuard
  ]
})
export class AdminModule { }
