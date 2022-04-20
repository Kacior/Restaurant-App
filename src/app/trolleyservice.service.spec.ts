import { TestBed } from '@angular/core/testing';

import { TrolleyserviceService } from './trolleyservice.service';

describe('TrolleyserviceService', () => {
  let service: TrolleyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrolleyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
