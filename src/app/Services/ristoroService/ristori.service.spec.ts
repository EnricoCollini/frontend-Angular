import { TestBed, inject } from '@angular/core/testing';

import { RistoriService } from './ristori.service';

describe('RistoriService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RistoriService]
    });
  });

  it('should be created', inject([RistoriService], (service: RistoriService) => {
    expect(service).toBeTruthy();
  }));
});
