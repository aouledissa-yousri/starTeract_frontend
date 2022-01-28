import { TestBed } from '@angular/core/testing';

import { DesAuthGuard } from './des-auth.guard';

describe('DesAuthGuard', () => {
  let guard: DesAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DesAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
