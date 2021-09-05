import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, 
              private service: UserService, 
              private fb: FormBuilder,) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  public submitForm(): void {
    this.userNew = this.form.value;
    this.service.registerUser(this.userNew).subscribe(
      user => {
        console.log(user);
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
        this.form.reset();
      },
    (err: HttpErrorResponse) => {
        this.Error = true;
      });
  }

  redirect(){
    this.router.navigate(['']);
  }

}

