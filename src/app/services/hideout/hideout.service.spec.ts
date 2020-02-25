import { TestBed } from '@angular/core/testing';

import { HideoutService } from './hideout.service';

describe('HideoutService', () => {
  let service: HideoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
