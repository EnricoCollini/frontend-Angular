import { TestBed, inject } from '@angular/core/testing';

import { AreaNaturaleService } from './area-naturale.service';

describe('AreaNaturaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaNaturaleService]
    });
  });

  it('should be created', inject([AreaNaturaleService], (service: AreaNaturaleService) => {
    expect(service).toBeTruthy();
  }));
});
