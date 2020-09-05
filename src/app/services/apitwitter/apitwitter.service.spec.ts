import { TestBed } from '@angular/core/testing';

import { ApiTwitterService } from './apitwitter.service';

describe('ApitwitterService', () => {
  let service: ApiTwitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTwitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
