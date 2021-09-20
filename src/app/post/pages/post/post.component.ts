import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: String;
  post: Post;

  constructor(private service: PostService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.service.getPost(this.id).subscribe(p => this.post = p["post"]);
    console.log(this.post);
  }

}
