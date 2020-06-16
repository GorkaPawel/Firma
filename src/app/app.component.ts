import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {
  }

  loggedUser = {};
  profileOpened = false;

  toggleProfile() {
    this.profileOpened = !this.profileOpened;
  }

  logOut() {
    this.toggleProfile();
    this.auth.logout();
  }

  ngOnInit(): void {
    let users = JSON.parse(localStorage.getItem('users'));
    if (!Array.isArray(users)) {
      users = [];
    }
    const index = users.findIndex(user => {
      return user.email === 'admin';
    });
    if (index === -1) {
      users.push({email: 'admin', password: 'admin'});
    }
    localStorage.setItem('users', JSON.stringify(users));
    this.auth.loggedUser.subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    });
  }
}
