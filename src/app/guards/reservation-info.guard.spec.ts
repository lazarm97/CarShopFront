import { TestBed } from '@angular/core/testing';

import { ReservationInfoGuard } from './reservation-info.guard';

describe('ReservationInfoGuard', () => {
  let guard: ReservationInfoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReservationInfoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
