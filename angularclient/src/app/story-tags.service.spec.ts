import { TestBed } from '@angular/core/testing';

import { StoryTagsService } from './story-tags.service';

describe('StoryTagsService', () => {
  let service: StoryTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
