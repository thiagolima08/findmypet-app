import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service:UserService){}

  ngOnInit(): void {
  }

  public userForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    email: new FormControl("", Validators.email),
    password: new FormControl(""),
  });

  public submitForm(): void {
    this.service.userAuthentication(this.userForm.get("email"),this.userForm.get("password"));
  }

  public clearForm(): void {
    this.userForm.reset();
  }
}

