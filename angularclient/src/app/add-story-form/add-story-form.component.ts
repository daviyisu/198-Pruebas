import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Story} from "../Story";
import {StoryService} from "../story.service";

@Component({
  selector: 'app-add-story-form',
  templateUrl: './add-story-form.component.html',
  styleUrls: ['./add-story-form.component.css']
})
export class AddStoryFormComponent {
  story: Story;

  constructor(private route: ActivatedRoute, private router: Router, private storyService: StoryService) {
    this.story = new Story();
  }

  onSubmit(){
    this.storyService.addStory(this.story).subscribe(response => this.router.navigate((['/stories'])));
  }
}
