import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//const AUTH_API = 'http://localhost:8080/api/auth/';

const env = environment.AUTH_API;

@Injectable({
  providedIn: 'root'
})
export class AfficherService {

  constructor(private http: HttpClient ) { }  
  afficherChallenge() :Observable<any>{
    return this.http.get(`${env}/challenge/afficher`);
  }
  
  
  afficherChallengeEncours() :Observable<any>{
    return this.http.get(`${env}/challenge/encours`);
  }

  afficherChallengeAvenir() :Observable<any>{
    return this.http.get(`${env}/challenge/avenir`);
  }
  afficherChallengeTerminer() :Observable<any>{
    return this.http.get(`${env}/challenge/terminer`);
  }

  afficherChallengeDecroissant() :Observable<any>{
    return this.http.get(`${env}/challenge/decroissant`);
  }
  
  afficheruser() :Observable<any>{
    return this.http.get(`${env}/utilisateur/afficheruser`);
  }
}