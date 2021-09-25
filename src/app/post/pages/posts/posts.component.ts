import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  isEdit: boolean;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.isEdit = this.route.snapshot.url.toString().includes('minhas-postagens');
    if(this.isEdit){
      this.postService.getPostOfUser().subscribe(p => {
        this.spinner.hide()
        this.posts = p["posts"],
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        } 
      })
    }else{
    this.postService.getPosts().subscribe(p => {
      this.spinner.hide()
      this.posts = p["posts"],
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      } 
    })
   }
  }

  openPost(id){
     this.router.navigate([`home/post/${id}`])
  }

  editPost(id){
     this.router.navigate([`home/edit-post/${id}`])
  }
}


