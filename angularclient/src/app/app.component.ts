import { Component } from '@angular/core';
import { StoryService } from "./story.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;

  constructor() {
    this.title = '198 Story Database Application';
  }
}
