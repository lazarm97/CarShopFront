import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Chart } from 'chart.js';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public canvas:any;
  public ctx:any;

  constructor(
    private AlertifyService : AlertifyService,
    private ReservationService : ReservationService
  ) { }

  ngOnInit(): void {
    this.ReservationService.getReservationsStatistic().subscribe(
      res => this.createChart(res['statistic']),
      err => this.AlertifyService.error("Greska prilikom dohvatanja podataka za statistiku!")
    );  
  }

  private createChart(x){
    var labels = [];
    var data = [];
    x.forEach(element => {
      labels.push(element.state);
    });
    x.forEach(element => {
      data.push(element.count);
    });
    this.canvas = document.getElementById('mychart');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(100, 132, 132, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
      }
  });
  }

}
