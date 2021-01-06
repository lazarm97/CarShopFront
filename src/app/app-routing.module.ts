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

const routes: Routes = [
  {path : 'transport', component : TransportComponent, data:{slider:true}},
  {path : '', component : HomeComponent, data:{slider:true}},
  {path : 'sell-used-cars', component : SellUsedCarsComponent, data:{slider:false}},
  {path : 'car', component : CarComponent, data:{slider:false}},
  {path : 'admin/dashboard', component : AdminComponent, data:{slider:false},
    children : [
      {
        path : 'home', component : AdminHomeComponent
      },
      {
        path : 'cars', component : CarsComponent, resolve : { cars : CarResolveGuard }
      },
      {
        path : 'new-car', component : NewCarComponent
      },
      {
        path : 'profile', component : AdminProfileComponent, resolve : { user : UserResolveGuard }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
