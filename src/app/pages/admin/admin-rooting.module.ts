import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/home/admin-home.component';
import { CarsComponent } from './components/cars/cars.component';
import { NewCarComponent } from './components/new-car/new-car.component';

const routes: Routes = [
  // {path : 'admin/dashboard/home', component : AdminHomeComponent},
  // {path : 'admin/dashboard/cars', component : CarsComponent},
  // {path : 'admin/dashboard/new-car', component : NewCarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
