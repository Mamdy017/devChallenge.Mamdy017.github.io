import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import Chart from 'chart.js/auto';
import { StorageService } from '../Services/storage.service';
import { ConnexionService } from '../Services/connexion.service';
import { AfficherService } from '../Services/afficher.service';
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
  graphiqueUser: any;
  jan: number=0;
  fe: number=0;
  mar: number=0;
  av: number=0;
  mai: number=0;
  jui: number=0;
  au: number=0;
  sep: number=0;
  oct: number=0;
  nov: number=0;
  dec: number=0;
  juil: number=0;

  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router, private connexion: ConnexionService,
    private storage: StorageService,private serviceAfficher:AfficherService) { }

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
      this.serviceAfficher.graphiqueUser().subscribe(data=>{
        this.graphiqueUser=data;
        console.log("fer",JSON.stringify(this.graphiqueUser.mois))
        for (const ft of this.graphiqueUser) {
          if (ft.mois == 1) {
            this.jan += 1;
            
          }
          if (ft.mois == 2) {
            this.fe += 1;
           
          }
          if (ft.mois == 3) {
            this.mar += 1;
            
          }
          if (ft.mois == 4) {
            this.av += 1;
           
          }
          if (ft.mois == 5) {
            this.mai += 1;
            
          }
          if (ft.mois == 6) {
            this.jui += 1;
           
          }
          if (ft.mois == 7) {
            this.juil += 1;
            
          }
          if (ft.mois == 8) {
            this.au += 1;
           
          }
          if (ft.mois == 9) {
            this.sep += 1;
           
          }
          if (ft.mois === 10) {
            this.oct += 1;
           
          }
          if (ft.mois == 11) {
            this.nov += 1;
            
          }
          if (ft.mois == 12) {
            this.dec += 1;
            
          }
  
          
        }
      })
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
            data: [this.jan, this.fe, this.mar, this.av, this.mai, this.jui,this.juil , this.au, this.sep, this.oct, this.nov, this.dec],
            backgroundColor: '#695CFE'
          },
          {
            label: "Profit",
            data: [0, 0, 0, 0, 0, 0.00, 1, 2, 0, 1, 0, 0],
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

