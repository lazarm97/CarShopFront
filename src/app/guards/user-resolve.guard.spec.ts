import { TestBed } from '@angular/core/testing';

import { UserResolveGuard } from './user-resolve.guard';

describe('ResolveGuard', () => {
  let guard: UserResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
