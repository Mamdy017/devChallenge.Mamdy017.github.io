import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const SOLUTION_ID = 'solution_id';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public enregistrer(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public recupererUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public connexionReussi(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }




  public saveId(solutionId: any): void {
    window.sessionStorage.removeItem(SOLUTION_ID);
    window.sessionStorage.setItem(SOLUTION_ID, JSON.stringify(solutionId));
  }

  public getId(): any {
    const solutionId = window.sessionStorage.getItem(SOLUTION_ID);
    if (solutionId) {
      return JSON.parse(solutionId);
    }

    return {};
  }



}
