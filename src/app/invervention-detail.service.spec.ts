import { TestBed } from '@angular/core/testing';

import { InverventionDetailService } from './invervention-detail.service';

describe('InverventionDetailService', () => {
  let service: InverventionDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InverventionDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
