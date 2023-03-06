import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../Services/connexion.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor( private inscription:ConnexionService,private storage: StorageService,private route: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.inscription.logout().subscribe({
      next: res => {
        this.storage.clean();
        this.route.navigate(['/connexion']);
      },
      error: err => {
      }
    });
  }
}
