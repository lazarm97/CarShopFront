import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations:any
  constructor(
    private ReservationService : ReservationService,
    private AlertifyService : AlertifyService
  ) { }

  ngOnInit(): void {
    this.ReservationService.getReservations().subscribe(
      (res) => (this.reservations = res['reservations']),
      (err) => this.AlertifyService.error(err)
    );
  }

  onCancelReservation(id){
    this.ReservationService.cancelReservation(id).subscribe(
      (res) => (this.AlertifyService.success("Rezervacija je otkazana!"),this.ngOnInit()),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.AlertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

  onStateReservation(id, state){
    this.ReservationService.stateReservation(id,state).subscribe(
      (res) => (this.AlertifyService.success("Status Rezervacije je promenjen!"),this.ngOnInit()),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.AlertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

  onShowExpiredReservations(e){
    if(e.target.checked){
      this.ReservationService.getReservations("true").subscribe(
        (res) => (this.reservations = res['reservations']),
        (err) => this.AlertifyService.error(err)
      );
    }else{
      this.ReservationService.getReservations().subscribe(
        (res) => (this.reservations = res['reservations']),
        (err) => this.AlertifyService.error(err)
      );
    }
  }
}
