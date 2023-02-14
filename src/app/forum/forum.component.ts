import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { AfficherService } from '../Services/afficher.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {

  menuBureau: boolean = true;
  menuMobile: boolean = false;
  idChallenge: any;
  solutionAffichage: any;
  term:any;
  p:any;

  constructor(public breakpointObserver: BreakpointObserver,private route: Router, private routes: ActivatedRoute,
    private serviceAjouter: AjouterServiceService, private serviceAfficher:AfficherService) { }
  actualise(): void {
    setInterval(
      () => {
      }, 100, clearInterval(1500));
  }
  ngOnInit(): void {
    this.idChallenge = this.routes.snapshot.params['id']
    this.afficherSolution();
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
  
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }
  afficherSolution(){
    this.serviceAfficher.solutions(this.idChallenge).subscribe(data=>{
      this.solutionAffichage=data;
      console.log("mes solutiosn", this.solutionAffichage);
    })
  }

}
