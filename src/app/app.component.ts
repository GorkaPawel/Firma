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
  loggedUser = false;
  profileOpened = false;
  toggleProfile() {
    this.profileOpened = !this.profileOpened;
  }
  logOut() {
    this.toggleProfile();
    this.auth.logout();
  }
  ngOnInit(): void {
    this.auth.loggedUser.subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    });
  }
}
