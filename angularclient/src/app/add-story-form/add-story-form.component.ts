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
  tagsFromForm: string;

  constructor(private route: ActivatedRoute, private router: Router, private storyService: StoryService) {
    this.story = new Story();
    this.tagsFromForm = "";
  }

  onSubmit(){
    this.story.setTagsFromForm(this.tagsFromForm);  //We transform the string received in the form in tags
    this.storyService.addStory(this.story).subscribe(response => this.router.navigate((['/stories'])));
  }
}
