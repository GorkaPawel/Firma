import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AllValidationErrors} from "../models/forms.models";
import {FormsService} from "../services/forms.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  errors: AllValidationErrors[] = [];
  subscription: Subscription;

  constructor(
              private fb: FormBuilder,
              private forms: FormsService,
              private auth: AuthService
  ) {
  }

  onLogin() {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.auth.login(user);
  }

  getErrorMessage(controlName: string): string {
    return this.forms.getErrorMessage(controlName, this.errors);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
    });
    this.subscription = this.loginForm.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
    )
      .subscribe(() => {
        this.errors = this.forms.getValidationErrors(this.loginForm.controls);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
