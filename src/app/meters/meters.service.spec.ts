import { TestBed } from '@angular/core/testing';

import { MetersService } from './meters.service';

describe('MetersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetersService = TestBed.get(MetersService);
    expect(service).toBeTruthy();
  });
});