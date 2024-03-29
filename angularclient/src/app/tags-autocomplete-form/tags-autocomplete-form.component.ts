import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, NgFor} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {map, Observable, startWith} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {TagsService} from "../tags.service";
import {RouterLink} from "@angular/router";
import {StoryService} from "../story.service";

@Component({
  selector: 'app-tags-autocomplete-form',
  templateUrl: './tags-autocomplete-form.component.html',
  styleUrls: ['./tags-autocomplete-form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
  ],
})
export class TagsAutocompleteFormComponent implements OnInit{
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];

  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private tagService: TagsService, private storyService: StoryService) {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  ngOnInit() {
    this.findAll();
  }

  onSubmit(){
    console.log(this.tags);
    this.storyService.findByTagList(this.tags).subscribe( data => {
      console.log(data);
    })
  }

  findAll(){
    this.tagService.findAll().subscribe(data => {
      for (let i = 0; i < data.length; i++){
        this.allTags.push(data.at(i)!.title);
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagsCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    // @ts-ignore
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
