import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryMaker2Component } from './itinerary-maker2.component';

describe('ItineraryMaker2Component', () => {
  let component: ItineraryMaker2Component;
  let fixture: ComponentFixture<ItineraryMaker2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryMaker2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryMaker2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
