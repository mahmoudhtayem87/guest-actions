import { TestBed } from '@angular/core/testing';

import { IpUtilService } from './ip-util.service';

describe('IpUtilService', () => {
  let service: IpUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
