import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPollComponent } from './content-poll.component';

describe('ContentPollComponent', () => {
  let component: ContentPollComponent;
  let fixture: ComponentFixture<ContentPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
