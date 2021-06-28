import { TestBed } from '@angular/core/testing';

import { NewCarGuard } from './new-car.guard';

describe('NewCarGuard', () => {
  let guard: NewCarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewCarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
