import { TestBed } from '@angular/core/testing';

import { CommentaryListService } from './commentary-list.service';

describe('CommentaryListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentaryListService = TestBed.get(CommentaryListService);
    expect(service).toBeTruthy();
  });
});
