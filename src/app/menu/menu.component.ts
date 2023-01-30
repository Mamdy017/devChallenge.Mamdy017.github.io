import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../Services/connexion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  };
  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  constructor(private inscription:ConnexionService) { }

  ngOnInit(): void {

  }
  onSubmit(): void {
    const { nom, prenom,username,email, password } = this.form;

    this.inscription.inscription(nom, prenom,username,email, password).subscribe({
      next: data => {
        console.log(data);
        this.InscriptionReussi = true;
        this.Inscriptionechoue = false;
      },
      error: err => {
        this.messageErreur = err.error.message;
        this.Inscriptionechoue = true;
      }
    });
  }

}
