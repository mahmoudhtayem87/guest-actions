import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingTwoOptionsComponent } from './rating-two-options.component';

describe('RatingTwoOptionsComponent', () => {
  let component: RatingTwoOptionsComponent;
  let fixture: ComponentFixture<RatingTwoOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingTwoOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingTwoOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
