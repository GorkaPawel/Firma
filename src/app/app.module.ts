import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { CoursesComponent } from './courses/courses.component';
import {FormsService} from "./services/forms.service";
import {AuthService} from "./services/auth.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import {AdminGuardService} from "./services/admin.guard";
import { DriversComponent } from './drivers/drivers.component';
import { AddCourseFormComponent } from './add-course-form/add-course-form.component';
import { CalculateComponent } from './calculate/calculate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    MyCoursesComponent,
    VehiclesComponent,
    DriversComponent,
    AddCourseFormComponent,
    CalculateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [FormsService, AuthService, FormBuilder, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
