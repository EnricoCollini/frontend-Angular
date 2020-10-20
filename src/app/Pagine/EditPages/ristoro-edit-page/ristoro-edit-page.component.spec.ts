import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RistoroEditPageComponent } from './ristoro-edit-page.component';

describe('RistoroEditPageComponent', () => {
  let component: RistoroEditPageComponent;
  let fixture: ComponentFixture<RistoroEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RistoroEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RistoroEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
