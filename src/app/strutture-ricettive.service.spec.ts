import { TestBed, inject } from '@angular/core/testing';

import { StruttureRicettiveService } from './strutture-ricettive.service';

describe('StruttureRicettiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StruttureRicettiveService]
    });
  });

  it('should be created', inject([StruttureRicettiveService], (service: StruttureRicettiveService) => {
    expect(service).toBeTruthy();
  }));
});
