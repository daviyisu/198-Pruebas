import { Component } from '@angular/core';
import {Story} from "../Story";
import {StoryService} from "../story.service";
import {TagsService} from "../tags.service";
import {Tag} from "../Tag";
import {Observable} from "rxjs";

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent {
  stories!: Story[];

  constructor(private storyService: StoryService, private  tagService: TagsService) {
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.storyService.findAll().subscribe(storyList => {
      this.stories = storyList;
    })
  }

}
