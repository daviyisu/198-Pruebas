import { Component } from '@angular/core';
import {Story} from "../Story";
import {StoryService} from "../story.service";


@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent {
  stories!: Story[];

  constructor(private storyService: StoryService) {
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
