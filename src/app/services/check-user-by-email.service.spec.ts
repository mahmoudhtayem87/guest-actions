import { TestBed } from '@angular/core/testing';

import { CheckUserByEmailService } from './check-user-by-email.service';

describe('CheckUserByEmailService', () => {
  let service: CheckUserByEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUserByEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
