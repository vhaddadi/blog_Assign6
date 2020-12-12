import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit, OnDestroy {
  blogPost: BlogPost = new BlogPost();
  tags: string;
  Sub: any;
  constructor(private postService: PostService, private router: Router) { }

  formSubmit(f: NgForm) {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = "WEB422 Student"
    this.blogPost.views = 0;
    this.Sub = this.postService.newPost(this.blogPost)
    .subscribe(data => {
      this.router.navigate(['admin']);
    });
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if (this.Sub) {
      this.Sub.unsubscribe();
    }
  }

}