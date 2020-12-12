import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service'; 

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit, OnDestroy{
 
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
