import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  blogPost: BlogPost;
  tags: string;
  querySub: any;
  updateSub: any;
  post: any;
  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }


  formSubmit(f: NgForm){
    this.blogPost.tags = this.tags.split(",").map(tag=>tag.trim()); 
    this.updateSub = this.data.updatePostById(this.blogPost._id, this.blogPost)
    .subscribe(()=>{
      this.router.navigate(['/admin']);
    });
  }

  deletePost(id){
    if(id){
      this.updateSub = this.data.deletePostById(id).subscribe(()=>{
        
        this.router.navigate(['/admin']);
      });
    }
  }

 ngOnInit(): void {
    this.post = this.data.getPostbyId(this.route.snapshot.params['id'])
    .subscribe(data => {
        this.blogPost = data; 
        this.tags = data.tags.toString();
      })
  }
  ngOnDestroy(): void {
    if(this.querySub){
      this.querySub.unsubscribe();
    }
    if(this.post){
      this.post.unsubscribe();
    }
    if(this.updateSub){
      this.updateSub.unsubscribe();
    }
  }

}
