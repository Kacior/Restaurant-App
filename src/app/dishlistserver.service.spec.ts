import { TestBed } from '@angular/core/testing';

import { DishlistserverService } from './dishlistserver.service';

describe('DishlistserverService', () => {
  let service: DishlistserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishlistserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
