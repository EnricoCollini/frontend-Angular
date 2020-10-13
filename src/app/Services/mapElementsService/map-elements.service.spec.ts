import { TestBed, inject } from '@angular/core/testing';

import { MapElementsService } from './map-elements.service';

describe('MapElementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapElementsService]
    });
  });

  it('should be created', inject([MapElementsService], (service: MapElementsService) => {
    expect(service).toBeTruthy();
  }));
});
