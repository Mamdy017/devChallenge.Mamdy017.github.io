import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service'; 

@Injectable({
  providedIn: 'root'
})
export class PermissionService implements CanActivate {
  constructor(private storage: StorageService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const user = this.storage.recupererUser();
    if (user && (user.roles.includes('ROLE_ADMIN') || user.username == 'adminuser')) {
      return true;
    } else {
      this.route.navigate(['/']);
      setInterval(() => {
        location.reload();
      }, 1000);
      return false;
    }
  }
}