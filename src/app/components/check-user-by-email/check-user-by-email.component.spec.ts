import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUserByEmailComponent } from './check-user-by-email.component';

describe('CheckUserByEmailComponent', () => {
  let component: CheckUserByEmailComponent;
  let fixture: ComponentFixture<CheckUserByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUserByEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckUserByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
