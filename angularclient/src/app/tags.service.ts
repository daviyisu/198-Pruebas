import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "./Tag"
@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tagsUrl: string;

  constructor(private http: HttpClient) {
    this.tagsUrl = "http://localhost:8080/tags/";
  }

  public findByStory(storyId: String):Observable<Tag[]>{
    return this.http.get<Tag[]>(this.tagsUrl + `tagsbystory/${storyId}`)
  }
}
