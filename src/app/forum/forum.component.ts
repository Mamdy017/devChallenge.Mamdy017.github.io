import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { AfficherService } from '../Services/afficher.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {

  form!: FormGroup;

  options4 = [
    { item_id: 1, item_text: 'New Delhi' },
    { item_id: 2, item_text: 'Mumbai' },
    { item_id: 3, item_text: 'Bangalore' },
    { item_id: 4, item_text: 'Pune' },
    { item_id: 5, item_text: 'Chennai' },
    { item_id: 6, item_text: 'Navsari' }
  ];
  bareme = {
    singleSelection: true, // <-- modification
    defaultOpen: false,
    idField: 'id',
    textField: 'bareme',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    closeDropDownOnSelection: true,
    // allowSearchFilter: this.ShowFilter
  };

  menuBureau: boolean = true;
  menuMobile: boolean = false;
  idChallenge: any;
  solutionAffichage: any;
  term: any;
  p: any;
  critereParIdChallenge: any;

  constructor(public breakpointObserver: BreakpointObserver, private route: Router, private routes: ActivatedRoute,
    private serviceAjouter: AjouterServiceService, private serviceAfficher: AfficherService,private fb: FormBuilder) { }
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
      // this.serviceAfficher.afficherBareme().subscribe(data => {
      //   this.options4 = data;
      // })
      this.options4 = [
        { item_id: 1, item_text: 'New Delhi' },
        { item_id: 2, item_text: 'Mumbai' },
        { item_id: 3, item_text: 'Bangalore' },
        { item_id: 4, item_text: 'Pune' },
        { item_id: 5, item_text: 'Chennai' },
        { item_id: 6, item_text: 'Navsari' }
    ];
  }
  affichage(idChallenge: any) {
    this.serviceAfficher.afficherCritereParIdChallenge(idChallenge).subscribe(data => {
      this.critereParIdChallenge = data;
      console.log("mes cccc", JSON.stringify(this.critereParIdChallenge))
    })
  }
  solid(id:number)
  {
alert(id);
  }
  onSubmit() {
    // Handle form submission here
    alert(this.form.value);
  }


  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }
  afficherSolution() {
    this.serviceAfficher.solutions(this.idChallenge).subscribe(data => {
      this.solutionAffichage = data;
      console.log("mes solutiosn", this.solutionAffichage);
    })
  }

}
