import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AllValidationErrors} from "../models/forms.models";
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {FormsService} from "../services/forms.service";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors: AllValidationErrors[] = [];
  subscription: Subscription;
  spin = false;
  onRegister() {
    this.spin = true;
    const user = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('passwords.password').value,
      passwordConfirm: this.registerForm.get('passwords.passwordConfirm').value,
    };
    this.authService.register(user);
  }
  getErrorMessage(controlName: string): string {
    return this.forms.getErrorMessage(controlName, this.errors);
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      passwords: this.fb.group({
          password: ['', [
            Validators.required,
            Validators.minLength(5)
          ]],
          passwordConfirm: ['']
        },
        {validators: this.forms.controlsNotMatch}),
    });
    this.subscription = this.registerForm.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
    )
      .subscribe(() => {
        this.errors = this.forms.getValidationErrors(this.registerForm.controls);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private forms: FormsService
  ) {
  }
}
