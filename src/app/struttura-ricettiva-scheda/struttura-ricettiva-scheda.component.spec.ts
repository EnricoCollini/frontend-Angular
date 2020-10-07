import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrutturaRicettivaSchedaComponent } from './struttura-ricettiva-scheda.component';

describe('StrutturaRicettivaSchedaComponent', () => {
  let component: StrutturaRicettivaSchedaComponent;
  let fixture: ComponentFixture<StrutturaRicettivaSchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrutturaRicettivaSchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrutturaRicettivaSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
