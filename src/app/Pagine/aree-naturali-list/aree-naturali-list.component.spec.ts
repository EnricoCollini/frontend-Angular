import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreeNaturaliListComponent } from './aree-naturali-list.component';

describe('AreeNaturaliListComponent', () => {
  let component: AreeNaturaliListComponent;
  let fixture: ComponentFixture<AreeNaturaliListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreeNaturaliListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreeNaturaliListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
