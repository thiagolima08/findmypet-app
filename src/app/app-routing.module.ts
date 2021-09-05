import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials/credentials.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/pages/login/login.component';
import { SignUpComponent } from './user/pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: '', component: CredentialsComponent},
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
