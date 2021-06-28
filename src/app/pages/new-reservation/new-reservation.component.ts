import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import  jwt_decode  from 'jwt-decode';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {
  date
  time
  reservationInfo
  constructor(
    private activateRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
    this.reservationInfo = this.activateRoute.snapshot.data['reservationInfo'];
    var tmpToday = new Date();
    tmpToday.setDate(tmpToday.getDate() + 1);
    var today = tmpToday.toISOString().split('T')[0];
    document.getElementById("date").setAttribute("min", today);
  }

  onSubmitReservation($e){
    var datetime = this.date+'T'+this.time;
    var userId = parseInt(this.userService.getUserId());
    var carId = parseInt(this.activateRoute.snapshot.params['id']);
    this.reservationService.createNewReservation(carId,userId,datetime).subscribe(
      (res) => this.alertifyService.success("Uspesno ste rezervisali vozilo!"),
      (err) => (
        err['error']['errors'].forEach(element => {
          this.alertifyService.error(element['ErrorMessage']);
        })
      )
    );
  }

}
