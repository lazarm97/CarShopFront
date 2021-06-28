import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportComponent } from './pages/transport/transport.component';
import { HomeComponent } from './pages/home/home.component';
import { SellUsedCarsComponent } from './pages/sell-used-cars/sell-used-cars.component';
import { CarComponent } from './pages/car/car.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminHomeComponent } from './pages/admin/components/home/admin-home.component';
import { CarsComponent } from './pages/admin/components/cars/cars.component';
import { NewCarComponent } from './pages/admin/components/new-car/new-car.component';
import { AdminProfileComponent } from './pages/admin/components/admin-profile/admin-profile.component';
import { UserResolveGuard } from './guards/user-resolve.guard';
import { CarResolveGuard } from './guards/car-resolve.guard';
import { NewCarGuard } from './guards/new-car.guard';
import { UpdateCarComponent } from './pages/admin/components/update-car/update-car.component';
import { NewReservationComponent } from './pages/new-reservation/new-reservation.component';
import { ReservationInfoGuard } from './guards/reservation-info.guard';
import { UserComponent } from './pages/user/user.component';
import { UserReservationsComponent } from './pages/user/components/user-reservations/user-reservations.component';
import { UserProfileComponent } from './pages/user/components/user-profile/user-profile.component';
import { UpdateCarOptionsComponent } from './pages/admin/components/update-car-options/update-car-options.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { BanUserComponent } from './pages/admin/components/ban-user/ban-user.component';
import { ReservationsComponent } from './pages/admin/components/reservations/reservations.component';

const routes: Routes = [
  {path : 'reset-password', component : ResetPasswordComponent, data:{slider:false}},
  {path : '', component : HomeComponent, data:{slider:true}},
  {path : 'sell-used-cars', component : SellUsedCarsComponent, data:{slider:false}, resolve : { cars : CarResolveGuard }},
  {path : 'car/:id', component : CarComponent, data:{slider:false}},
  {path : 'new-reservation/:id', component : NewReservationComponent, data:{slider:false}, resolve : { reservationInfo : ReservationInfoGuard }},
  {path : 'admin/dashboard', component : AdminComponent, data:{slider:false},
    children : [
      {
        path : 'home', component : AdminHomeComponent
      },
      {
        path : 'cars', component : CarsComponent, resolve : { cars : CarResolveGuard }
      },
      {
        path : 'new-car', component : NewCarComponent, resolve : { newcar : NewCarGuard }
      },
      {
        path : 'profile', component : AdminProfileComponent, resolve : { user : UserResolveGuard }
      },
      {
        path : 'update-car/:id', component : UpdateCarComponent, resolve : { newcar : NewCarGuard}
      },
      {
        path : 'update-car-options', component : UpdateCarOptionsComponent
      },
      {
        path : 'ban-user', component : BanUserComponent
      },
      {
        path : 'reservations', component : ReservationsComponent
      }
    ],
  },
  {path : 'user/dashboard', component : UserComponent, data:{slider:false},
    children : [
      {
        path : 'reservation', component : UserReservationsComponent
      },
      {
        path : 'profile', component : UserProfileComponent, resolve : { user : UserResolveGuard}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
