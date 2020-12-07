import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { TransportComponent } from './pages/transport/transport.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SellUsedCarsComponent } from './pages/sell-used-cars/sell-used-cars.component';
import { CarComponent } from './pages/car/car.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { LogoutComponent } from './pages/admin/components/logout/logout.component';
import { AdminModule } from './pages/admin/admin.module';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRoutingModule } from './pages/admin/admin-rooting.module';
import { HttpClientModule } from '@angular/common/http';
import { ResolveGuard } from './guards/resolve.guard';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    TransportComponent,
    FooterComponent,
    HomeComponent,
    SellUsedCarsComponent,
    CarComponent,
    LogoutComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AlertifyService
  ],
  bootstrap: [AppComponent,NavigationComponent]
})
export class AppModule { }
