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
    this.storyService.findAll().subscribe(data => {
      this.stories = data;
    })
  }

  findAll() {
    this.storyService.findAll().subscribe(data => {this.stories = data;
    })
  }
}
