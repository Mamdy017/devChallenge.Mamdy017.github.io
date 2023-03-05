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
    if (user && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('adminuser'))) {
      return true;
    } else {
      // this.route.navigate(['/']);
      location.reload();
      setInterval(() => {
        location.reload();
      }, 10);
      return false;
    }
  }
}
