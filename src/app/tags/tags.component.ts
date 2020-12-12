import { Component, OnDestroy, OnInit } from '@angular/core';
import {PostService} from '../post.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {
  tags: Array<string>;
  private sub: any;
  constructor(private data : PostService) { }

  ngOnInit(): void {
    
    this.sub = this.data.getTags().subscribe(data => this.tags = data);
    console.log([this.tags]);
  }

  ngOnDestroy(): void{
    if(this.sub) this.sub.unsubscribe();
  }




}
