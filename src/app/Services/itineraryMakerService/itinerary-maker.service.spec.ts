import { TestBed, inject } from '@angular/core/testing';

import { ItineraryMakerService } from './itinerary-maker.service';

describe('ItineraryMakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItineraryMakerService]
    });
  });

  it('should be created', inject([ItineraryMakerService], (service: ItineraryMakerService) => {
    expect(service).toBeTruthy();
  }));
});
