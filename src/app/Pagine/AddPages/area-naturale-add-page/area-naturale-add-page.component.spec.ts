import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaNaturaleAddPageComponent } from './area-naturale-add-page.component';

describe('AreaNaturaleAddPageComponent', () => {
  let component: AreaNaturaleAddPageComponent;
  let fixture: ComponentFixture<AreaNaturaleAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaNaturaleAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaNaturaleAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
