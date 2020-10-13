import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarioSchedaComponent } from './itinerario-scheda.component';

describe('ItinerarioSchedaComponent', () => {
  let component: ItinerarioSchedaComponent;
  let fixture: ComponentFixture<ItinerarioSchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarioSchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarioSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
