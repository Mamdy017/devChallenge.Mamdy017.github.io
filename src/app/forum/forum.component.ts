import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [DatePipe]

})
export class ForumComponent implements OnInit {

  menuBureau: boolean = true;
  menuMobile: boolean = false;

  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router, private serviceAjouter: AjouterServiceService, private datePipe: DatePipe) { }
  challengeForm!: FormGroup;

  actualise(): void {
    setInterval(
      () => {
      }, 100, clearInterval(1500));
  }
  ngOnInit(): void {
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

  onSubmit() {
    const formData = new FormData();
    this.challengeForm.value.datedebut = this.datePipe.transform(this.challengeForm.value.datedebut, 'yyyy/MM/dd');
    this.challengeForm.value.datefin = this.datePipe.transform(this.challengeForm.value.datefin, 'yyyy/MM/dd');
    formData.append('critereids', this.challengeForm.value.critereids);
    formData.append('tecnhoids', this.challengeForm.value.tecnhoids);
    formData.append('cateids',this.challengeForm.value.cateids);
    formData.append('titre', this.challengeForm.value.titre);
    formData.append('description', this.challengeForm.value.description);
    formData.append('datedebut', this.challengeForm.value.datedebut);
    formData.append('datefin', this.challengeForm.value.datefin);
    formData.append('photo', this.challengeForm.value.fileSource);
    
  
    console.log("avant methode post" + formData);
    console.log("datedebut " + this.challengeForm.value.datedebut)
    console.log("datefin" + this.challengeForm.value.datefin)
    console.log("titre" + this.challengeForm.value.titre)
    console.log("cateids" + this.challengeForm.value.cateids)
    console.log("critereids" + this.challengeForm.value.critereids)
    console.log("tecnhoids" + this.challengeForm.value.tecnhoids)
    console.log("description" + this.challengeForm.value.description)
    console.log("photo" + this.challengeForm.value.fileSource)
    this.serviceAjouter.AjouterChallenge(formData).subscribe(data => {
      // Do something with the response data
      console.log(data);
    });
    // , error => {
    //   console.log(error);
    // });
  }
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

}
