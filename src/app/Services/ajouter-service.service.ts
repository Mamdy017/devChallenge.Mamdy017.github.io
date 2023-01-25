import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const env = environment.AUTH_API;
@Injectable({
  providedIn: 'root'
})
export class AjouterServiceService {

  constructor(private http: HttpClient) { }
  AjouterChallenge(formData: FormData) {
    return this.http.post('http://localhost:8080/devs/auth/challenge/ajout', formData);
  }
}
