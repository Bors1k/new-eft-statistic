import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyHitsComponent } from './body-hits.component';

describe('BodyHitsComponent', () => {
  let component: BodyHitsComponent;
  let fixture: ComponentFixture<BodyHitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyHitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyHitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
