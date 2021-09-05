import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginError = false;
  public form: FormGroup;
  hide = true;

  constructor(private router: Router, public service: UserService,  private fb: FormBuilder,) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public submitForm(): void {
    this.service.userAuthentication(
      this.form.get('email'),
      this.form.get('password')
    ).subscribe((data: any) => {
      localStorage.setItem('userToken', data.token);
      this.router.navigate(['/home']);
      this.form.reset();
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

  redirect(){
    this.router.navigate(['']);
  }
  
}
