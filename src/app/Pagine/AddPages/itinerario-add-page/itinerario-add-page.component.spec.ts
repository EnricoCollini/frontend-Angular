import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarioAddPageComponent } from './itinerario-add-page.component';

describe('ItinerarioAddPageComponent', () => {
  let component: ItinerarioAddPageComponent;
  let fixture: ComponentFixture<ItinerarioAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarioAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarioAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
