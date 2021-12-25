import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  loginError = '';
  constructor(private authService: AuthService,
              private router: Router,
              private dialogRef: MatDialogRef<LoginComponent>,
              private formBuilder: FormBuilder
              ) {

    this.loginForm = this.formBuilder.group(
      {
        email : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required, Validators.minLength(6)]]
      }
    );

    this.registerForm = this.formBuilder.group(
      {
        firstname : ['', [Validators.required, Validators.pattern('^[a-zA-Z]$')]],
        lastname : ['', [Validators.required, Validators.pattern('^[a-zA-Z]$')]],
        email : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  ngOnInit() {
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login(this.loginForm.getRawValue()).subscribe(
      (response) => {
        if (response !=  null) {
          this.authService.setSession(response);
          this.router.navigate(['home']);
          this.dialogRef.close();
        }
      },
      (error) => {
        this.loginError = error.message;
      }
    );
  }

  register() {

  }

  getLoginEmailErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'You must enter a value';
    } else if (this.loginForm.get('email').hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  getLoginPasswordErrorMessage() {
    if (this.loginForm.get('password').hasError('required')) {
      return 'You must enter a value';
    } else if (this.loginForm.get('password').hasError('minlength')) {
      return  'Password must be of 6 or more characters';
    }
    return '';
  }

  getRegisterPasswordErrorMessage() {
    if (this.registerForm.get('password').hasError('required')) {
      return 'You must enter a value';
    } else if (this.registerForm.get('password').hasError('minlength')) {
      return  'Password must be of 6 or more characters';
    }
    return '';
  }

  getRegisterEmailErrorMessage() {
    if (this.registerForm.get('email').hasError('required')) {
      return 'You must enter a value';
    } else if (this.registerForm.get('email').hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  getRegisterFirstNameErrorMessage() {
    if (this.registerForm.get('firstname').hasError('required')) {
      return 'You must enter a value';
    } else if (this.registerForm.get('firstname').hasError('pattern')) {
      return 'Only alphabets allowed';
    }
    return '';
  }

  getRegisterLastNameErrorMessage() {
    if (this.registerForm.get('lastname').hasError('required')) {
      return 'You must enter a value';
    } else if (this.registerForm.get('lastname').hasError('pattern')) {
      return 'Only alphabets allowed';
    }
    return '';
  }

}
