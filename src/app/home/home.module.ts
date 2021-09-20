import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material.module';
import { CreatePostComponent } from '../post/pages/create-post/create-post.component';
import { PostComponent } from '../post/pages/post/post.component';
import { PostsComponent } from '../post/pages/posts/posts.component';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent, 
    CreatePostComponent, 
    PostComponent
  ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxSpinnerModule,
  ]
})
export class HomeModule { }