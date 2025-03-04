import { TestBed } from '@angular/core/testing';

import { ApiariesService } from './apiaries.service';

describe('ApiariesService', () => {
  let service: ApiariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
