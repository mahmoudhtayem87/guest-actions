import { TestBed } from '@angular/core/testing';

import { ContentPollService } from './content-poll.service';

describe('ContentPollService', () => {
  let service: ContentPollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentPollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
