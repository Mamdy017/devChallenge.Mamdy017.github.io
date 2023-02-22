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
  challenge: any;
  encours: any;
  terminer: any;
  avenir: any;
  user: any;
  avenir1: any;
  fervrier: any;
  juin: any;
  janvier: any;
  mars: any;
  avril: any;
  mai1: any;
  juillet: any;
  aout: any;
  septembre: any;
  octobre: any;
  novembre: any;
  decembre: any;
  categorie: any;

  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router, private connexion: ConnexionService,
    private storage: StorageService,private serviceAfficher:AfficherService) { }

  actualise(): void {
    setInterval(() => { }, 100, clearInterval(1500));
  }

  ngOnInit(): void {
    this.serviceAfficher.afficherCategorie().subscribe(data=>{
      this.categorie=data;
    })   

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
      this.serviceAfficher.graphiqueUser().subscribe(data => {
        this.graphiqueUser = data;
        console.log("graphiqueUser", this.graphiqueUser);
        this.janvier = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois ===1);
        this.fervrier = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois ===2);
        this.mars = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 3);
        this.avril = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 4);
        this.mai1 = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 5);
        this.juin = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 6);
        this.juillet = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 7);
        this.aout = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 8);
        this.septembre = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 9);
        this.octobre = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 10);
        this.novembre = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 11);
        this.decembre = this.graphiqueUser.filter((graphiqueUser: { mois: number; }) => graphiqueUser.mois === 12);
        this.jan = this.janvier.length;
        this.fe = this.fervrier.length;
        this.mar = this.mars.length;
        this.av = this.avril.length;
        this.mai = this.mai1.length;
        this.jui = this.juin.length;
        this.juil = this.juillet.length;
        this.au = this.aout.length;
        this.sep = this.septembre.length;
        this.oct = this.octobre.length;
        this.nov = this.novembre.length;
        this.dec = this.decembre.length;
        
      
        this.createChart(); // Créez le chart ici, après avoir récupéré la valeur de fe.
      });
      
    
      this.serviceAfficher.afficheruser().subscribe(data => {
        this.user = data.slice().reverse();
        console.table(this.user);
      });

      this.serviceAfficher.afficherChallenge().subscribe(data => {
        this.challenge = data;
  
      });
      this.serviceAfficher.afficherChallengeEncours().subscribe(data => {
        this.encours = data;
      });
      this.serviceAfficher.afficherChallengeTerminer().subscribe(data => {
        this.terminer= data;
  
      });
      this.serviceAfficher.afficherChallengeTerminer().subscribe(data => {
        this.avenir = data;
  
      });
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
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        datasets: [
          {
            label: "Utilisateur",
            data: [this.jan, this.fe, this.mar, this.av, this.mai, this.jui,this.juil , this.au, this.sep, this.oct, this.nov, this.dec],
            backgroundColor: '#695CFE'
          },
          {
            label: "Participation aux challenges",
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

