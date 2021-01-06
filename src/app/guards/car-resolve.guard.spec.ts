import { TestBed } from '@angular/core/testing';

import { CarResolveGuard } from './car-resolve.guard';

describe('CarResolveGuard', () => {
  let guard: CarResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CarResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
