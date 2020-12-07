import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellUsedCarsComponent } from './sell-used-cars.component';

describe('SellUsedCarsComponent', () => {
  let component: SellUsedCarsComponent;
  let fixture: ComponentFixture<SellUsedCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellUsedCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellUsedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
