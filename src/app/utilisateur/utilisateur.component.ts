import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfficherService } from '../Services/afficher.service';
import { StorageService } from '../Services/storage.service';
import Swal from 'sweetalert2';
import { AjouterServiceService } from '../Services/ajouter-service.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  connexionReussi = false;
  connexionEchoue = false;
  p: any;
  term: any
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  user: any;
  adminP: any;
  roles: string[] = [];
  errorMessage: any;
  status: any;
  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router, private serviceAfficher: AfficherService,private storage: StorageService,private serviceAjouter:AjouterServiceService) { }

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
    this.serviceAfficher.afficheruser().subscribe(data => {
      this.user = data;
    });
    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
      this.adminP=this.storage.recupererUser().roles=='adminuser';
    }
  }
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

  bannir(idUsers:number){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
      swalWithBootstrapButtons.fire({
        title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Cet utilidateur va être bannis cette action est irreversible !!?</h1>",
        showCancelButton: true,
        confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
        cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
      })
        .then((result) => {
          if (result.isConfirmed) {
            
            this.serviceAjouter.supprimerUser(idUsers).subscribe((data: any) => {
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
  }

}
