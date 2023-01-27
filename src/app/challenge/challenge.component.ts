import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfficherService } from '../Services/afficher.service';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers: [DatePipe]
})
export class ChallengeComponent implements OnInit {

  errorMessage: string = "";
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  challengeForm!: FormGroup;
  options = [];
  options1 = [];
  options2 = [];



  catetec = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    noDataAvailablePlaceholderText: 'No data available',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  critere = {
    singleSelection: false,
    idField: 'id',
    textField: 'critere',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
      allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  responseMessage: string="";
  
  

  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router,private serviceAfficher:AfficherService,
     private serviceAjouter: AjouterServiceService, private datePipe: DatePipe) { }

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
      this.challengeForm = new FormGroup({
        titre: new FormControl(''),
        description: new FormControl(''),
        datedebut: new FormControl(''),
        datefin: new FormControl(''),
        critereids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
        tecnhoids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
        cateids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
        photo: new FormControl(''),
        fileSource: new FormControl('', [Validators.required])
  
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
  
  get fphoto(){
    return this.challengeForm.controls;
  }


  onFileChangePhoto(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.challengeForm.patchValue({
        fileSource: file
      });
    }
  }
  // onSubmit() {
  //   const formData = new FormData();
  //   const cateids = this.challengeForm.value.cateids.map((options: { id: any; }) => options.id);
  //   const tecnhoids = this.challengeForm.value.cateids.map((options2: { id: any; }) => options2.id);
  //   const critereids = this.challengeForm.value.cateids.map((options1: { id: any; }) => options1.id);
  //   this.challengeForm.value.datedebut = this.datePipe.transform(this.challengeForm.value.datedebut, 'yyyy/MM/dd');
  //   this.challengeForm.value.datefin = this.datePipe.transform(this.challengeForm.value.datefin, 'yyyy/MM/dd');

  //   formData.append('critereids',critereids);
  //   formData.append('tecnhoids', tecnhoids);
  //   formData.append('cateids',cateids);
  //   formData.append('titre', this.challengeForm.value.titre);
  //   formData.append('description', this.challengeForm.value.description);
  //   formData.append('datedebut', this.challengeForm.value.datedebut);
  //   formData.append('datefin', this.challengeForm.value.datefin);
  //   formData.append('photo', this.challengeForm.value.fileSource);

  //   this.serviceAjouter.AjouterChallenge(formData).subscribe(data => {
        
  //   });
  
  // }
  onSubmit() {
    if (this.challengeForm.valid) {
        const formData = new FormData();
        const cateids = this.challengeForm.value.cateids.map((options: { id: any; }) => options.id);
        const tecnhoids = this.challengeForm.value.cateids.map((options2: { id: any; }) => options2.id);
        const critereids = this.challengeForm.value.cateids.map((options1: { id: any; }) => options1.id);
        this.challengeForm.value.datedebut = this.datePipe.transform(this.challengeForm.value.datedebut, 'yyyy/MM/dd');
        this.challengeForm.value.datefin = this.datePipe.transform(this.challengeForm.value.datefin, 'yyyy/MM/dd');
    
        formData.append('critereids',critereids);
        formData.append('tecnhoids', tecnhoids);
        formData.append('cateids',cateids);
        formData.append('titre', this.challengeForm.value.titre);
        formData.append('description', this.challengeForm.value.description);
        formData.append('datedebut', this.challengeForm.value.datedebut);
        formData.append('datefin', this.challengeForm.value.datefin);
        formData.append('photo', this.challengeForm.value.fileSource);
        
        this.serviceAjouter.AjouterChallenge(formData).subscribe((data:any) => {
          this.errorMessage = data.message;
        });
    } else {
       this.errorMessage="Tous les champs champs sont obligatoirs !!";
       
    }
}

    afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

}
