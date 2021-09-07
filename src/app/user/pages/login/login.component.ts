import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, 
              public service: UserService,  
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  openSnackBar(msg: string,className: string) {
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [className]
    });
  }

  public submitForm(): void {
    this.spinner.show();
    this.service.userAuthentication(
      this.form.get('email').value,
      this.form.get('password').value
    ).subscribe((data: any) => {
      this.spinner.hide();
      this.openSnackBar('Aunteticado, seja bem-vindo.','success-snackbar');
      localStorage.setItem('userToken', data.token);
      this.router.navigate(['/home']);
      this.form.reset();
    },
    (err: HttpErrorResponse) => {
      this.spinner.hide();
      this.openSnackBar('Não autenticado, verifique e-mail e/ou senha.','error-snackbar');
      this.isLoginError = true;
    });
  }

  redirect(){
    this.router.navigate(['']);
  }
  
}
