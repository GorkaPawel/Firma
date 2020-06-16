import {Component, DoCheck, OnInit} from '@angular/core';
import {courses} from "../mocks/courses";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private auth: AuthService) {
    this.courses = courses;
  }
  loggedUser = {};
  courses;
  formOpened = false;
  toggleForm(e) {
    if (e) {
    e.stopPropagation();
    }
    this.formOpened = !this.formOpened;
  }
  bookCourse(course) {
    this.auth.bookCourse(course);
  }
  ngOnInit(): void {
    let addedCourses = JSON.parse(localStorage.getItem('addedCourses'));
    if (!Array.isArray(addedCourses)) {
      addedCourses = [];
    }
    const nextCourses = [...this.courses, ...addedCourses];
    this.courses = nextCourses;
    this.auth.loggedUser.subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    })
  }

}
