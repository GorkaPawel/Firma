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
    let registeredUsers = JSON.parse(localStorage.getItem(STORAGE_USERS));
    if (!Array.isArray(registeredUsers)) {
      registeredUsers = [];
    }
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
    let registeredUsers = JSON.parse(localStorage.getItem(STORAGE_USERS));
    if (!Array.isArray(registeredUsers)) {
      registeredUsers = [];
    }
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

  bookCourse(course) {
    let registeredUsers = JSON.parse(localStorage.getItem(STORAGE_USERS));
    if (!Array.isArray(registeredUsers)) {
      registeredUsers = [];
    }
    const loggedUser = this.loggedUser.getValue();
    const resultIndex = (registeredUsers || []).findIndex(user => {
      return user.email === loggedUser.email;
    });
    if (resultIndex === -1) {
      return;
    }
    const result = registeredUsers[resultIndex];
    const resultCourses = result.courses || [];
    const resultCourse = resultCourses.find(el => {
      return el.id === course.id
    });
    if (resultCourse) {
      return;
    }
    resultCourses.push(course);

    result.courses = resultCourses;
    registeredUsers.splice(resultIndex, 1);
    registeredUsers.push(result);
    localStorage.setItem(STORAGE_USERS, JSON.stringify(registeredUsers));
  }

  addCourse(course) {
    const {odjazd, z, to, kierowca, slots} = course;
    let addedCourses = JSON.parse(localStorage.getItem('addedCourses'));
    if (!Array.isArray(addedCourses)) {
      addedCourses = [];
    }
    const newCourse = {
      time: odjazd,
      from: z,
      to,
      driver: kierowca,
      slots
    };
    addedCourses.push(newCourse);
    localStorage.setItem('addedCourses', JSON.stringify(addedCourses));
  }

  logout() {
    this.loggedUser.next(null);
    this.router.navigate(['']);
  }
}
