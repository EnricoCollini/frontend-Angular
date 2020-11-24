import { TestBed, inject } from '@angular/core/testing';

import { AmministratoreService } from './amministratore.service';

describe('AmministratoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmministratoreService]
    });
  });

  it('should be created', inject([AmministratoreService], (service: AmministratoreService) => {
    expect(service).toBeTruthy();
  }));
});
