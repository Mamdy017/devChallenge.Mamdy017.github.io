import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../Services/connexion.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  connexionReussi = false;
  connexionEchoue = false;
  form: any = {
    username: null,
    email: null,
    numero: null,
    password:'123456',
  };
  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  roles: string[] = [];
  adminP:any;
  constructor(private route: Router,private inscription:ConnexionService,private storage: StorageService) { }

  ngOnInit(): void {

    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
      this.adminP=this.storage.recupererUser().roles=='adminuser';
    }
  }
  onSubmit(): void {
    const { nom, prenom,username,email, numero, password } = this.form;

    this.inscription.inscription(nom, prenom,username,email, numero, password).subscribe({
      next: data => {
        // console.log(data);
        this.InscriptionReussi = true;
        this.Inscriptionechoue = false;
      },
      error: err => {
        this.messageErreur = err.error.message;
        this.Inscriptionechoue = true;
      }
    });
  }

  logout(): void {
    this.inscription.logout().subscribe({
      next: res => {
        // console.log(res);
        this.storage.clean();
        this.route.navigate(['/connexion']);
        // window.location.reload();
      },
      error: err => {
        // console.log(err);
      }
    });
  }
}
