import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostComponent } from '../post/pages/create-post/create-post.component';
import { PostComponent } from '../post/pages/post/post.component';
import { PostsComponent } from '../post/pages/posts/posts.component';
import { HomeComponent } from './components/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
    {
      path: '',
      component: PostsComponent
    },
    {
      path: 'minhas-postagens',
      component: PostsComponent
    },
    {
      path: 'create',
      component: CreatePostComponent
    },
    {
      path: 'post/:id',
      component: PostComponent
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
