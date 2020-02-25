import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletsTableComponent } from './bullets-table.component';

describe('BulletsTableComponent', () => {
  let component: BulletsTableComponent;
  let fixture: ComponentFixture<BulletsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
