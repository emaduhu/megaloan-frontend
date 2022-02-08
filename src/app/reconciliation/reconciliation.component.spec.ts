import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReconciliationComponent } from './reconciliation.component';

describe('ReconciliationComponent', () => {
  let component: ReconciliationComponent;
  let fixture: ComponentFixture<ReconciliationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
