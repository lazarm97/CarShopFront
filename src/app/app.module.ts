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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { LogoutComponent } from './pages/admin/components/logout/logout.component';
import { AdminModule } from './pages/admin/admin.module';
import { AdminComponent } from './pages/admin/admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NewReservationComponent } from './pages/new-reservation/new-reservation.component';
import { UserComponent } from './pages/user/user.component';
import { UserNavigationComponent } from './pages/user/components/fixed/user-navigation/user-navigation.component';
import { UserReservationsComponent } from './pages/user/components/user-reservations/user-reservations.component';
import { UserProfileComponent } from './pages/user/components/user-profile/user-profile.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


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
    AdminComponent,
    NewReservationComponent,
    UserComponent,
    UserNavigationComponent,
    UserReservationsComponent,
    UserProfileComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    HttpClientModule,
    CommonModule,
    NgxGalleryModule
    ],
  exports: [
    ],
    providers: [
    AuthService,
    AlertifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent,NavigationComponent]
})
export class AppModule { }
