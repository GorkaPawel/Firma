import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CoursesComponent} from "./courses/courses.component";
import {MyCoursesComponent} from "./my-courses/my-courses.component";
import {VehiclesComponent} from "./vehicles/vehicles.component";
import {AdminGuardService} from "./services/admin.guard";
import {DriversComponent} from "./drivers/drivers.component";
import {CalculateComponent} from "./calculate/calculate.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'my-courses', component: MyCoursesComponent},
  {path: 'calculate', component: CalculateComponent},
  {path: 'drivers', component: DriversComponent},
  {path: 'vehicles', component: VehiclesComponent, canActivate: [AdminGuardService]},
  {path: '', component: CoursesComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
