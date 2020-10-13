import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryMakerComponent } from './itinerary-maker.component';

describe('ItineraryMakerComponent', () => {
  let component: ItineraryMakerComponent;
  let fixture: ComponentFixture<ItineraryMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
