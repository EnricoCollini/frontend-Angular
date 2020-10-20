import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaNaturaleEditPageComponent } from './area-naturale-edit-page.component';

describe('AreaNaturaleEditPageComponent', () => {
  let component: AreaNaturaleEditPageComponent;
  let fixture: ComponentFixture<AreaNaturaleEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaNaturaleEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaNaturaleEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
