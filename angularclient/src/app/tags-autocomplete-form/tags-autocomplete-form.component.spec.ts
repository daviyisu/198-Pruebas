import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsAutocompleteFormComponent } from './tags-autocomplete-form.component';

describe('TagsAutocompleteFormComponent', () => {
  let component: TagsAutocompleteFormComponent;
  let fixture: ComponentFixture<TagsAutocompleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsAutocompleteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsAutocompleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
