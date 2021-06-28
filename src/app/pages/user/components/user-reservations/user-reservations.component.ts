import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {
  reservations = []
  constructor(
    private reservationService : ReservationService,
    private userService : UserService,
    private alertifyService : AlertifyService
  ) { }

  ngOnInit(): void {
    var userId = this.userService.getUserId();
    this.reservationService.getUserReservations(userId).subscribe(
      (res) => this.reservations = res['reservations'],
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

  onCancelReservation(id){
    this.reservationService.cancelReservation(id).subscribe(
      (res) => (this.alertifyService.success("Rezervacija je otkazana"),this.ngOnInit()),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    )
  }

}
