import { TestBed } from '@angular/core/testing';

import { UserInteractionServiceService } from './user-interaction-service.service';

describe('UserInteractionServiceService', () => {
  let service: UserInteractionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInteractionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
