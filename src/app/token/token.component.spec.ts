import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TokenComponent } from './token.component';

describe('TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
