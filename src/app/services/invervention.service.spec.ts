import { TestBed } from '@angular/core/testing';

import { InverventionService } from './invervention.service';

describe('InverventionService', () => {
  let service: InverventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InverventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
