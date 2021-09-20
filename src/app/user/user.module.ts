import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule} from '@angular/material/core';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MaterialModule } from '../material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CredentialsComponent } from './pages/credentials/credentials.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    CredentialsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSpinnerModule,
    UserRoutingModule
  ],
  providers: []
})
export class UserModule { }
