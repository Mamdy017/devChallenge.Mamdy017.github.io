import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfficherService } from '../Services/afficher.service';


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  menuBureau: boolean = true;
  menuMobile: boolean = false;

  options = [];
  options1 = [];
  options2 = [];


  selectedOptions = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
  };
  

  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router,private serviceAfficher:AfficherService) { }

  actualise(): void {
    setInterval(
      () => {
      }, 100, clearInterval(1500));
  }
  ngOnInit(): void {

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
      this.serviceAfficher.afficherCategorie().subscribe(data => {
        this.options = data;
      });
      this.serviceAfficher.afficherTecnho().subscribe(data=>{
        this.options1=data;
      })
      this.serviceAfficher.afficherCritere().subscribe(data=>{
        this.options2=data;
      })
  }
    afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

}
