import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StruttureRicettiveTableComponent } from './strutture-ricettive-table.component';

describe('StruttureRicettiveTableComponent', () => {
  let component: StruttureRicettiveTableComponent;
  let fixture: ComponentFixture<StruttureRicettiveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StruttureRicettiveTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StruttureRicettiveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
