import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavigationComponent } from './components/fixed/admin-navigation/admin-navigation.component';
import { AdminHomeComponent } from './components/home/admin-home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminRoutingModule } from './admin-rooting.module';
import { CarsComponent } from './components/cars/cars.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserResolveGuard } from 'src/app/guards/user-resolve.guard';
import { CarResolveGuard } from 'src/app/guards/car-resolve.guard';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { UpdateCarOptionsComponent } from './components/update-car-options/update-car-options.component';
import { BanUserComponent } from './components/ban-user/ban-user.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

@NgModule({
  declarations: [
    AdminNavigationComponent,
    AdminHomeComponent,
    CarsComponent,
    NewCarComponent,
    AdminProfileComponent,
    UpdateCarComponent,
    UpdateCarOptionsComponent,
    BanUserComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminNavigationComponent,
    AdminRoutingModule
  ],
  bootstrap: [
    AdminNavigationComponent
  ],
  providers : [
    UserResolveGuard,
    CarResolveGuard
  ]
})
export class AdminModule { }
