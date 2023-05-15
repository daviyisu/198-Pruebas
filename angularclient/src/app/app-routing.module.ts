import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StoryListComponent} from "./story-list/story-list.component";
import {AddStoryFormComponent} from "./add-story-form/add-story-form.component";

const routes: Routes = [
  {path: 'stories', component: StoryListComponent},
  {path: 'addstory', component: AddStoryFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
