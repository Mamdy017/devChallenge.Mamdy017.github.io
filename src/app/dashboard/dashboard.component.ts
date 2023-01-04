import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuBureau: boolean = true;
  menuMobile: boolean = false;

  public chart: any;

  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router) { }

  actualise(): void {
    setInterval(
      () => {
      }, 100, clearInterval(1500));
  }

  ngOnInit(): void {
    this.createChart();

    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.menuBureau = false;
          this.menuMobile = true;
          this.actualise();
        } else {
          this.menuBureau = true;
          this.menuMobile = false;
          this.actualise();
        }
      });
  }
  title = 'DevsChallenge';
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

 

  createChart() {
    this.actualise();
    this.chart = new Chart("MyChart", {

      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Jan', 'Fev', 'Mars', 'Av',
          'Mai', 'Juin', 'Juil', 'Août','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: "Sales",
            data: ['467', '577', '572', '79', '92',
              '574', '573', '576', '79', '92',
              '574', '573'],
            backgroundColor: '#695CFE'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541', '79', '92',
              '574', '573'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }




}
