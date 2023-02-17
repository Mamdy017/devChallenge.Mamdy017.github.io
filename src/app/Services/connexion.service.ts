import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const env = environment.AUTH_API;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor(private http: HttpClient) { }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post(
      env + '/connexion2',
      {
        usernameOrEmail,
        password,
      },
      httpOptions
    );
  }

  inscription(nom: string, prenom: string, username:string,email:string,numero:string, password: string): Observable<any> {
    return this.http.post(
      env + '/inscription',
      {
        nom,
        prenom,
        username,
        email,
        numero,
        password,
        "roles":[
          "adminuser"
      ]
      },
      httpOptions
    );
  }

  modifier(id:any, username: string, email: string, prenom:string,nom:string, numero: string, profile:File): Observable<any>{
    let formData =new FormData
    formData.append("username",username),
    formData.append("email",email),
    formData.append("prenom",prenom),
    formData.append("nom",nom),
    formData.append("numero",numero),
    formData.append("profile",profile)
    return this.http.put(`http://localhost:8080/devs/auth/utilisateur/modifier/${id}`,formData)
  }
  logout(): Observable<any> {
    const req = new HttpRequest('POST', env + 'signout', {}, httpOptions);
    return this.http.request(req);
  }
}
