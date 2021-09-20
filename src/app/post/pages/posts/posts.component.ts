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

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.postService.getPosts().subscribe(p => {
      this.spinner.hide()
      this.posts = p["posts"],
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      } 
    })
  }

  openPost(id){
     this.router.navigate([`home/post/${id}`])
  }
    
}


