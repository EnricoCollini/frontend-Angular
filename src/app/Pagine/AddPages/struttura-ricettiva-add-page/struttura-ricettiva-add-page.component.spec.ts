import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrutturaRicettivaAddPageComponent } from './struttura-ricettiva-add-page.component';

describe('StrutturaRicettivaAddPageComponent', () => {
  let component: StrutturaRicettivaAddPageComponent;
  let fixture: ComponentFixture<StrutturaRicettivaAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrutturaRicettivaAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrutturaRicettivaAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
