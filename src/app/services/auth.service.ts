import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

const STORAGE_USERS = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  loggedUser = new BehaviorSubject(null);

  login(userCredentials) {
    const {email, password} = userCredentials;
    const registeredUsers = JSON.parse(localStorage.getItem(STORAGE_USERS));
    const result = (registeredUsers).find(user => {
      return user.email === email && user.password === password;
    });
    if (!result) {
      return;
    }
    this.loggedUser.next(userCredentials);
    this.router.navigate(['']);
  }

  register(userCredentials) {
    const {email, password} = userCredentials;
    const registeredUsers = JSON.parse(localStorage.getItem(STORAGE_USERS));
    const result = (registeredUsers).find(user => {
      return user.email === email;
    });
    if (result) {
      return alert('Użytkownik z tym emailem już istnieje.');
    }
    const nextUsers = [...registeredUsers];
    nextUsers.push({email, password});
    localStorage.setItem(STORAGE_USERS, JSON.stringify(nextUsers));
    this.router.navigate(['']);
  }

  logout() {
    this.loggedUser.next(null);
    this.router.navigate(['']);
  }
}
