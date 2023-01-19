import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../Services/connexion.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  form: any = {
    usernameOrEmail: null,
    password: null
  };
  connexionReussi = false;
  connexionEchoue = false;
  messageErreur = '';

  currentUser: any;
  isLoggedIn: any;
  role: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;

  eventBusService: any;
  
  roles: string[] = [];
  modal: any;
  constructor( private connexion: ConnexionService,
    private storage: StorageService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const { usernameOrEmail, password } = this.form;

    this.connexion.login(usernameOrEmail, password).subscribe({
      next: data => {
        this.storage.enregistrer(data);

        this.connexionEchoue = false;
        this.connexionReussi = true;
        this.storage.connexionReussi();

        this.roles = this.storage.recupererUser().roles;
        //this.reloadPage();
        this.router.navigateByUrl("/dashboard")
      },
      error: err => {
        this.messageErreur = err.error.message;
        this.connexionEchoue = true;
      }
    });

  }


}