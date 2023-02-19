import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfficherService } from '../Services/afficher.service';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers: [DatePipe]
})
export class ChallengeComponent implements OnInit {

  term: any;
  p: any;
  errorMessage: string = "";
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  challengeForm!: FormGroup;
  critereForm!: FormGroup;
  cateForm!: FormGroup;
  technoForm!: FormGroup;
  baremeForm!: FormGroup;
  challengeFormModifier!: FormGroup;
  titre: any;
  description: any;
  datefin: any;
  status: any;
  today!: Date;
  encours: any;
  terminer: any;

  options = [];
  options1 = [];
  options2 = [];
  options4 = [];

  catetec = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    noDataAvailablePlaceholderText: 'No data available',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    itemsShowLimit: 3,
  };
  critere = {
    singleSelection: false,
    idField: 'id',
    textField: 'critere',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    itemsShowLimit: 1,
  };
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  bareme = {
    singleSelection: true, // <-- modification
    defaultOpen: false,
    idField: 'id',
    textField: 'bareme',
    selectAllText: 'Tout',
    unSelectAllText: 'Tout',
    closeDropDownOnSelection: true,
    allowSearchFilter: this.ShowFilter
  };
  responseMessage: string = "";
  challenge: any;
  critereParIdChallenge: any;
  ParIdChallenge: any;
  idChallenge!: number;
  avenir: any;
  crite: any;





  constructor(public breakpointObserver: BreakpointObserver,
    private route: Router, private routes: ActivatedRoute, private serviceAfficher: AfficherService,
    private serviceAjouter: AjouterServiceService, private datePipe: DatePipe) { }

  actualise(): void {
    // this.serviceAfficher.afficherChallengeAvenir().subscribe(data=>{
    //   this.avenir=data;
    // })
    setInterval(
      () => {
      }, 100, clearInterval(1500));
  }
  ngOnInit(): void {
    this.today = new Date();
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
    this.challengeFormModifier = new FormGroup({
      titremod: new FormControl(''),
      descriptionmod: new FormControl(''),
      datedebutmod: new FormControl(''),
      datefinmod: new FormControl(''),
      critereidsmod: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
      tecnhoidsmod: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
      cateidsmod: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
      photomod: new FormControl(''),
      fileSourcemod: new FormControl('', [Validators.required])
    });
    this.critereForm = new FormGroup({
      criteres: new FormControl(''),
      baremeids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),

    })
    this.cateForm = new FormGroup({
      cate: new FormControl(''),
    })
    this.baremeForm = new FormGroup({
      bareme: new FormControl(''),
    })
    this.technoForm = new FormGroup({
      techno: new FormControl(''),
    })
    this.serviceAfficher.afficherChallenge().subscribe(data => {
      this.challenge = data;
    });
    this.serviceAfficher.afficherChallengeEncours().subscribe(data => {
      this.encours = data;
    });
    this.serviceAfficher.afficherChallengeTerminer().subscribe(data => {
      this.terminer = data;

    });

    this.idChallenge = this.routes.snapshot.params['idChallenge']


    this.serviceAfficher.afficherCategorie().subscribe(data => {
      this.options = data;
    });
    this.serviceAfficher.afficherCategorie().subscribe(data => {
      this.options = data;
    });
    this.serviceAfficher.afficherTecnho().subscribe(data => {
      this.options1 = data;
    })
    this.serviceAfficher.afficherCritere().subscribe(data => {
      this.options2 = data;
    })
    this.serviceAfficher.afficherBareme().subscribe(data => {
      this.options4 = data;
    })
  }

  get fphoto() {
    return this.challengeForm.controls;
  }


  onFileChangePhoto(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.challengeForm.patchValue({
        fileSource: file
      });
    }
  }
  onFileChangePhotoMod(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.challengeFormModifier.patchValue({
        fileSourcemod: file
      });
    }
  }

  onSubmit() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    if (this.challengeForm.valid) {
      const formData = new FormData();
      const cateids = this.challengeForm.value.cateids.map((options: { id: any; }) => options.id);
      const tecnhoids = this.challengeForm.value.tecnhoids.map((options2: { id: any; }) => options2.id);
      const critereids = this.challengeForm.value.critereids.map((options1: { id: any; }) => options1.id);
      this.challengeForm.value.datedebut = this.datePipe.transform(this.challengeForm.value.datedebut, 'yyyy/MM/dd');
      this.challengeForm.value.datefin = this.datePipe.transform(this.challengeForm.value.datefin, 'yyyy/MM/dd');

      formData.append('critereids', critereids);
      formData.append('tecnhoids', tecnhoids);
      formData.append('cateids', cateids);
      formData.append('titre', this.challengeForm.value.titre);
      formData.append('description', this.challengeForm.value.description);
      formData.append('datedebut', this.challengeForm.value.datedebut);
      formData.append('datefin', this.challengeForm.value.datefin);
      formData.append('photo', this.challengeForm.value.fileSource);


      swalWithBootstrapButtons.fire({
        title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Cet challenge va être ajouté !!?</h1>",
        showCancelButton: true,
        confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
        cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.serviceAjouter.AjouterChallenge(formData).subscribe((data: any) => {
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


    } else {
      swalWithBootstrapButtons.fire(
        `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Tous les champs champs sont obligatoirs !!</h1>`,
      )

    }
  }
  onSubmitModifier() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    if (this.challengeFormModifier.valid) {
      const formData = new FormData();
      const cateIds = this.challengeFormModifier.value.cateidsmod.map((options: { id: any; }) => options.id);
      const tecnhoIds = this.challengeFormModifier.value.tecnhoidsmod.map((options1: { id: any; }) => options1.id);
      const critereIds = this.challengeFormModifier.value.critereidsmod.map((options2: { id: any; }) => options2.id);
      this.challengeFormModifier.value.datedebutmod = this.datePipe.transform(this.challengeFormModifier.value.datedebutmod, 'yyyy/MM/dd');
      this.challengeFormModifier.value.datefinmod = this.datePipe.transform(this.challengeFormModifier.value.datefinmod, 'yyyy/MM/dd');

      formData.append('critereIds', critereIds);
      formData.append('tecnhoIds', tecnhoIds);
      formData.append('cateIds', cateIds);
      formData.append('titre', this.challengeFormModifier.value.titremod);
      formData.append('description', this.challengeFormModifier.value.descriptionmod);
      formData.append('datedebut', this.challengeFormModifier.value.datedebutmod);
      formData.append('datefin', this.challengeFormModifier.value.datefinmod);
      formData.append('photo', this.challengeFormModifier.value.fileSourcemod);

      swalWithBootstrapButtons.fire({
        title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Cet challenge va être ajouté !!?</h1>",
        showCancelButton: true,
        confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
        cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.serviceAjouter.modifierChallenge(this.idChallenge, formData).subscribe((data: any) => {
              this.errorMessage = data.message;
              this.status = data.status;

              if (this.status == true) {
                swalWithBootstrapButtons.fire(
                  `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,

                )
                this.challengeFormModifier.reset();

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
    } else {
      swalWithBootstrapButtons.fire(
        `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Tous les champs champs sont obligatoirs !!</h1>`,
      )

    }
  }
  onSubmitCritere() {
    if (this.critereForm.valid) {
      const formData = new FormData();
      const baremeids = this.critereForm.value.baremeids.map((options4: { id: any; }) => options4.id);
      // console.log("vvvvvvvvvv" + baremeids);
      // console.log("mes id" + this.critereForm.value.criteres)
      formData.append('baremeids', baremeids);
      formData.append('criteres', this.critereForm.value.criteres);

      this.serviceAjouter.AjouterCritere(formData).subscribe((data: any) => {
        this.errorMessage = data.message;
        this.status = data.status;
        this.critereForm.reset();
      });
    } else {
      this.errorMessage = "Tous les champs champs sont obligatoirs !!";

    }
  }

  onSubmitBareme() {
    if (this.baremeForm.valid) {
      const formData = new FormData();
      formData.append('bareme', this.baremeForm.value.bareme);
      // console.log("mes" + this.baremeForm.value.bareme);
      this.serviceAjouter.AjouterBareme(formData).subscribe((data: any) => {
        this.errorMessage = data.message;
        this.status = data.status;
        this.baremeForm.reset();
      });
    } else {
      this.errorMessage = "Tous les champs champs sont obligatoirs !!";

    }
  }
  onSubmitCate() {
    if (this.cateForm.valid) {
      const formData = new FormData();
      formData.append('cate', this.cateForm.value.cate);

      this.serviceAjouter.AjouterCate(formData).subscribe((data: any) => {
        this.errorMessage = data.message;
        this.status = data.status;
        this.cateForm.reset();
      });
    } else {
      this.errorMessage = "Tous les champs champs sont obligatoirs !!";

    }
  }
  onSubmitTechno() {
    if (this.technoForm.valid) {
      const formData = new FormData();
      formData.append('techno', this.technoForm.value.techno);
      // console.log("bvbvbvb" + this.technoForm.value.techno);
      this.serviceAjouter.AjouterTechno(formData).subscribe((data: any) => {
        this.errorMessage = data.message;
        this.status = data.status;
        this.technoForm.reset();
      });
    } else {
      this.errorMessage = "Tous les champs champs sont obligatoirs !!";

    }
  }
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

  affichage(idChallenge: any) {
    this.serviceAfficher.afficherCritereParIdChallenge(idChallenge).subscribe(data => {
      this.critereParIdChallenge = data;
      // console.log("mes cccc",JSON.stringify(this.critereParIdChallenge))
    })
    this.serviceAfficher.afficherParIdChallenge(idChallenge).subscribe(data => {
      this.ParIdChallenge = data;
      this.titre = data.titre;
      this.description = data.description;
      this.datefin = data.datefin;
      this.crite = data.critere.nom
    })
  }

  isChallengeInProgress(startDate: string): boolean {
    const challengeStartDate = new Date(startDate.split('T')[0]);
    const currentDate = new Date();
    return challengeStartDate > currentDate;
  }

  reset() {
    this.challengeForm.reset();
  }

  resetC() {
    this.critereForm.reset();
  }

}
