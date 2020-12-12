import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {
  post: BlogPost;
  querySub: any;
  sub:any;
  // Comment
  commentName: string;
  commentText: string;
  updateSub:any;

  constructor(private route: ActivatedRoute, private data : PostService) { }

      ngOnInit(): void {
        this.querySub = this.route.params.subscribe(params=>{
          this.sub = this.data.getPostbyId(params['id']).subscribe(data=>{
          //  console.log([data]);
            this.post = data;
            this.post.views++;
        this.updateSub = this.data.updatePostById(this.post._id, this.post).subscribe();
          });
        });

      }

      submitComment(f: NgForm){
        this.post.comments.push({
          author: this.commentName,
          comment: this.commentText,
          date: new Date().toLocaleDateString()
        })
        this.updateSub = this.data.updatePostById(this.post._id, this.post).subscribe(()=>{
          this.commentName = "";
          this.commentText = "";
        });
      }

      ngOnDestroy(){
        if(this.querySub){
          this.querySub.unsubscribe();
        }
        if(this.sub){
          this.sub.unsubscribe();
        }
        if (this.updateSub){
          this.updateSub.unsubscribe();
        }
      }
  }


