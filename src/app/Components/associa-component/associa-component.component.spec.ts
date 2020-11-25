import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociaComponentComponent } from './associa-component.component';

describe('AssociaComponentComponent', () => {
  let component: AssociaComponentComponent;
  let fixture: ComponentFixture<AssociaComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociaComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
