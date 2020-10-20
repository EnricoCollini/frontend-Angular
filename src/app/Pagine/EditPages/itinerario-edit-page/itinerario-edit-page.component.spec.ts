import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarioEditPageComponent } from './itinerario-edit-page.component';

describe('ItinerarioEditPageComponent', () => {
  let component: ItinerarioEditPageComponent;
  let fixture: ComponentFixture<ItinerarioEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarioEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarioEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
