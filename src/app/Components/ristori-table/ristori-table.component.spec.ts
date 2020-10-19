import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RistoriTableComponent } from './ristori-table.component';

describe('RistoriTableComponent', () => {
  let component: RistoriTableComponent;
  let fixture: ComponentFixture<RistoriTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RistoriTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RistoriTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
