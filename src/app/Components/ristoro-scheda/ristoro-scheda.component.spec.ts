import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RistoroSchedaComponent } from './ristoro-scheda.component';

describe('RistoroSchedaComponent', () => {
  let component: RistoroSchedaComponent;
  let fixture: ComponentFixture<RistoroSchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RistoroSchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RistoroSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
