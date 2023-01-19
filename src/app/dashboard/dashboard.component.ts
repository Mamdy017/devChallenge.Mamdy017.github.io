import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import Chart from 'chart.js/auto';
import { StorageService } from '../Services/storage.service';
import { ConnexionService } from '../Services/connexion.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  form: any = {
    usernameOrEmail: null,
    password: null
  };
  connexionReussi = false;
  connexionEchoue = false;
  messageErreur = '';

  currentUser: any;
  isLoggedIn: any;
  role: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;

  eventBusService: any;

  roles: string[] = [];
  menuBureau: boolean = true;
  menuMobile: boolean = false;

  public chart: any;

  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router, private connexion: ConnexionService,
    private storage: StorageService) { }

  actualise(): void {
    setInterval(() => { }, 100, clearInterval(1500));
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
      if (this.storage.connexionReussi()) {
        this.connexionReussi = true;
        this.roles = this.storage.recupererUser().roles;
      }
  
      this.currentUser = this.storage.recupererUser();
      console.table(this.currentUser);
      var moi = this.currentUser.id;
  
      console.log("je suis id user" + moi);
  
      this.isLoggedIn = this.storage.connexionReussi();
  
      if (this.isLoggedIn) {
        const user = this.storage.recupererUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_USER');
  
        this.username = user.username;
      }
  }
  title = 'DevsChallenge';
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mars', 'Av', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "Sales",
            data: [467, 577, 572, 79, 92, 574, 573, 576, 79, 92, 574, 573],
            backgroundColor: '#695CFE'
          },
          {
            label: "Profit",
            data: [542, 542, 536, 327, 17, 0.00, 538, 541, 79, 92, 574, 1000],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });

    this.actualise();
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.connexion.logout().subscribe({
      next: res => {
        console.log(res);
        this.storage.clean();
        this.route.navigate(['/connexion']);
       // window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

