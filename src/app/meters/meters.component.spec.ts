import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetersComponent } from './meters.component';

describe('MetersComponent', () => {
  let component: MetersComponent;
  let fixture: ComponentFixture<MetersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
