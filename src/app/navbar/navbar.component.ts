import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../Services/connexion.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  connexionReussi = false;
  connexionEchoue = false;

  currentUser: any;
  isLoggedIn: any;
  role: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;

  
  eventBusService: any;

  form = {
    nom: '',
    prenom: '',
    username: '',
    password: '',
    email: ''
  };
  roles: string[] = [];
  constructor(private route: Router, private connexion: ConnexionService,
    private storage: StorageService) { }

  ngOnInit(): void {
    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
    }


    

    this.currentUser = this.storage.recupererUser();
    console.table(this.currentUser);
    var moi = this.currentUser.id;

    this.isLoggedIn = this.storage.connexionReussi();

    if (this.isLoggedIn) {
      const user = this.storage.recupererUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('adminuser');

      this.username = user.username;
    }
  }
  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.connexion.logout().subscribe({
      next: res => {
        console.log(res);
        this.storage.clean();
        this.route.navigate(['/connexion']);
       // window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    const { nom, prenom,username,email, password } = this.form;
alert("je suis username"+this.form.nom)
    this.connexion.inscription(nom, prenom,username,email, password).subscribe({
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
