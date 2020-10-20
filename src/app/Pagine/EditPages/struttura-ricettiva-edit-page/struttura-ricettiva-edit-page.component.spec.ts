import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrutturaRicettivaEditPageComponent } from './struttura-ricettiva-edit-page.component';

describe('StrutturaRicettivaEditPageComponent', () => {
  let component: StrutturaRicettivaEditPageComponent;
  let fixture: ComponentFixture<StrutturaRicettivaEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrutturaRicettivaEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrutturaRicettivaEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
