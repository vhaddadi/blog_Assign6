import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';


let perPage = 6;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts():Observable<BlogPost[]>{

    const perPage = Number.MAX_SAFE_INTEGER;
    return this.http.get<BlogPost[]>(`https://w422-blog-api.herokuapp.com/api/posts?page=1&perPage=${perPage}`);
    
  }

  newPost(data: BlogPost):Observable<any>{

    return this.http.post<any>(`https://w422-blog-api.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any>{

    return this.http.put<any>(`https://w422-blog-api.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any>{

    return this.http.delete<any>(`https://w422-blog-api.herokuapp.com/api/posts/${id}`);
  }

  getPosts(page: number, tag: string, category: string): Observable<BlogPost[]>{
    //******* need to check!********

    let urlTemplate = `https://w422-blog-api.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`;
   
    if(tag != null || tag != undefined){
      urlTemplate += `&tag=${tag}`;
    }
    if(category != null || category != undefined){
      urlTemplate += `&category=${category}`;
    }
    //console.log(url);
    return this.http.get<BlogPost[]>(urlTemplate);

 }

  getPostbyId(id: any): Observable<BlogPost> {

    return this.http.get<BlogPost>(`https://w422-blog-api.herokuapp.com/api/posts/${id}`);

  }

  getCategories(): Observable<any> {

    return this.http.get<any>(`https://w422-blog-api.herokuapp.com/api/categories`);
  }

 
  getTags(): Observable<string[]> {

    return this.http.get<string[]>(`https://w422-blog-api.herokuapp.com/api/tags`);

  }

}
