import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoSchedaComponent } from './punto-scheda.component';

describe('PuntoSchedaComponent', () => {
  let component: PuntoSchedaComponent;
  let fixture: ComponentFixture<PuntoSchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoSchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
