import { TestBed } from '@angular/core/testing';

import { ManagerguardGuard } from './managerguard.guard';

describe('ManagerguardGuard', () => {
  let guard: ManagerguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
