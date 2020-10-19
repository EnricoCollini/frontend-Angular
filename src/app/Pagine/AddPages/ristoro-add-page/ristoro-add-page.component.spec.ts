import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RistoroAddPageComponent } from './ristoro-add-page.component';

describe('RistoroAddPageComponent', () => {
  let component: RistoroAddPageComponent;
  let fixture: ComponentFixture<RistoroAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RistoroAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RistoroAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
