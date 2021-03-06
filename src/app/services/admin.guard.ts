import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(): boolean {
    const loggedUser = this.auth.loggedUser.getValue();
    if (loggedUser?.email === 'admin') {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
