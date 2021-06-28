import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarOptionsComponent } from './update-car-options.component';

describe('UpdateCarOptionsComponent', () => {
  let component: UpdateCarOptionsComponent;
  let fixture: ComponentFixture<UpdateCarOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCarOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCarOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
