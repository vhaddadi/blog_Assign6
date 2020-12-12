import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service'; 

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit, OnDestroy {

  posts: Array<BlogPost>;
  sub: any;
  
  constructor(private data:PostService) { }

  ngOnInit(): void {
    this.sub = this.data.getPosts(1, null, null).subscribe(data=>{
      this.posts = data.slice(0,3);
    });
  }

  ngOnDestroy(){
    if (this.sub) this.sub.unsubscribe();
  }

}
