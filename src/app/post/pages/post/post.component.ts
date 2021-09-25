import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/Post';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: String;
  posts=[];

  constructor(private service: PostService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getPost()
  }

  getPost(){
   this.service.getPost(this.id).toPromise().then(p => this.posts.push(p["post"]));
  }

}
