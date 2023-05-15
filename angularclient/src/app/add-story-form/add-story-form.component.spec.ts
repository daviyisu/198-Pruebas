import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoryFormComponent } from './add-story-form.component';

describe('AddStoryFormComponent', () => {
  let component: AddStoryFormComponent;
  let fixture: ComponentFixture<AddStoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
