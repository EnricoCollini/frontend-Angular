import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerariTableComponent } from './itinerari-table.component';

describe('ItinerariTableComponent', () => {
  let component: ItinerariTableComponent;
  let fixture: ComponentFixture<ItinerariTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerariTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerariTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
