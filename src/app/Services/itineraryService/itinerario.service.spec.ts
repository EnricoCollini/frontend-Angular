import { TestBed, inject } from '@angular/core/testing';

import { ItinerarioService } from './itinerario.service';

describe('ItinerarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItinerarioService]
    });
  });

  it('should be created', inject([ItinerarioService], (service: ItinerarioService) => {
    expect(service).toBeTruthy();
  }));
});
