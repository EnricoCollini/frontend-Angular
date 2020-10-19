import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreeNaturaliTableComponent } from './aree-naturali-table.component';

describe('AreeNaturaliTableComponent', () => {
  let component: AreeNaturaliTableComponent;
  let fixture: ComponentFixture<AreeNaturaliTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreeNaturaliTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreeNaturaliTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
