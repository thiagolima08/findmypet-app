import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;
  userNew: User;
  Error = false;
  hide = true;
  hide_confirm_password = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private service: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  openSnackBar(msg: string, className: string) {
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [className],
    });
  }

  public submitForm(): void {
    this.userNew = this.form.value;
    this.spinner.show();
    this.service.registerUser(this.userNew).subscribe(
      (user) => {
        this.spinner.hide();
        console.log(user);
        this.openSnackBar(
          'Cadastro realizado com sucesso!',
          'success-snackbar'
        );
        this.router.navigate(['/login']);
        this.form.reset();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.openSnackBar(err.message, 'error-snackbar');
        this.Error = true;
      }
    );
  }

  redirect() {
    this.router.navigate(['']);
  }
}
