import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { AfficherService } from '../Services/afficher.service';
import Swal from 'sweetalert2';
import { StorageService } from '../Services/storage.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {

  critereSelectionne: { id: string, selection: string }[] = [];


  menuBureau: boolean = true;
  menuMobile: boolean = false;
  idChallenge: any;
  solutionAffichage: any;
  term: any;
  p: any;
  critereParIdChallenge: any;
  idcr: any;

  options = ['Valider', 'Partiel', 'Non valider'];
  selectedValues: any[] = [];
  ids: any;
  errorMessage: any;
  status: any;
  classements: any;
  mesteam: any;

  constructor(
    public breakpointObserver: BreakpointObserver,
     private route: Router,
      private routes: ActivatedRoute,
    private serviceAjouter: AjouterServiceService,
     private serviceAfficher: AfficherService,
     private storageService: StorageService
     ) { }
  actualise(): void {
    setInterval(
      () => {
      }, 100, clearInterval(1500));
  }
  ngOnInit(): void {

    this.idChallenge = this.routes.snapshot.params['id']
    this.serviceAfficher.afficherCritereParIdChallenge(this.idChallenge).subscribe(data => {
      this.critereParIdChallenge = data;
      // alert("mes cccc"+ JSON.stringify(this.critereParIdChallenge))
    })
    this.mesclassements()
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
  afficherSolution() {
    this.serviceAfficher.solutions(this.idChallenge).subscribe(data => {
      this.solutionAffichage = data;
    })
  }

  onSubmit() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    const selectedValues = this.critereParIdChallenge.map((cpidc: { critere: string; }) => {
      const selectElement = document.getElementsByName(cpidc.critere)[0] as HTMLSelectElement;
      return selectElement.value;
    }).filter((value: string) => ['Valider', 'Partiel', 'Non valider'].includes(value));
    this.serviceAfficher.afficherCritereParIdChallenge(this.idChallenge).subscribe(data => {
      this.critereParIdChallenge = data;
      this.ids = this.critereParIdChallenge.map((critere: { id: any; }) => critere.id);
      swalWithBootstrapButtons.fire({
        title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Cette Solution va être corrigé !!?</h1>",
        showCancelButton: true,
        confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
        cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // alert(this.storageService.getId().id)
          // alert(selectedValues)
          this.serviceAjouter.Correction(selectedValues, this.storageService.getId().id, this.ids).subscribe(data => {
            this.errorMessage = data.message;
            this.status = data.status;

            if (this.status == true) {
              swalWithBootstrapButtons.fire(
                `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
              )
            } else if (this.status == false) {
              swalWithBootstrapButtons.fire(
                `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
              )
            }
          });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '',
            "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
            'error'
          )
        }
      })

    })
  }

   mesclassements(){
    this.serviceAfficher.classements(this.idChallenge).subscribe(data=>{
      this.classements=data
      // alert(JSON.stringify(this.classements))
    })
   }
   affichage(id:number){
    const solutionId = {
      "id":id
    }
    this.storageService.saveId(solutionId);
    // alert(solutionId)
   }
   mesteams(teamId:number){
    this.serviceAfficher.team(this.idChallenge,teamId).subscribe(data=>{
      this.mesteam=data;
    })
   }

}
