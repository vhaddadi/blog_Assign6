import { Component, OnDestroy, OnInit } from '@angular/core';
import {PostService} from '../post.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories: Array<any>;
  private sub: any;
  constructor(private dataService : PostService) { }

  ngOnInit(): void {
    
    this.sub = this.dataService.getCategories().subscribe(data =>
      this.categories = data
          
      );
    
    //     console.log([this.categories]);

  }

  ngOnDestroy(): void{
    if(this.sub) this.sub.unsubscribe();
  }

}
