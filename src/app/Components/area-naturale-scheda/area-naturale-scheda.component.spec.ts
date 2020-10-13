import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaNaturaleSchedaComponent } from './area-naturale-scheda.component';

describe('AreaNaturaleSchedaComponent', () => {
  let component: AreaNaturaleSchedaComponent;
  let fixture: ComponentFixture<AreaNaturaleSchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaNaturaleSchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaNaturaleSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
