import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StoryListComponent} from "./story-list/story-list.component";

const routes: Routes = [
  {path: 'stories', component: StoryListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
