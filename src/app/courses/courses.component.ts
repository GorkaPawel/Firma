import { Component, OnInit } from '@angular/core';
import {courses} from "../mocks/courses";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor() {
    this.courses = courses;
  }

  courses;
  ngOnInit(): void {
  }

}
