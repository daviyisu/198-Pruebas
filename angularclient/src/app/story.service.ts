import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Story} from "./Story"

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private storiesUrl: string;

  constructor(private http: HttpClient) {
    this.storiesUrl = "http://localhost:8080/stories/";
  }

  public findAll():Observable<Story[]>{
    return this.http.get<Story[]>(this.storiesUrl + "all");
  }

public findByTagList(tags: string[]):Observable<Story[]>{
    const params = { tags_title_list: tags };
    return this.http.get<Story[]>(this.storiesUrl + 'storiesbytaglist', { params })
}

  public addStory(story: Story):Observable<Story>{
    return this.http.post<Story>(this.storiesUrl + "addstory", story);
  }

  public deleteStory(story: Story):Observable<Object>{
    return this.http.delete<Story>(`${this.storiesUrl}deletebyid/${story.id}`);
  }
}
