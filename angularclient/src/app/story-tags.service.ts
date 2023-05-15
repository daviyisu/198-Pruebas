import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Story} from "./Story";
import {StoryTags} from "./StoryTags";

@Injectable({
  providedIn: 'root'
})
export class StoryTagsService {

  private storyTagsUrl: string;
  constructor( private http: HttpClient) {
    this.storyTagsUrl = "http://localhost:8080/storytags/";
  }
/*
  public findAll():Observable<StoryTags[]>{
    return this.http.get<StoryTags[]>(this.storyTagsUrl + "all");
  }*/
}
