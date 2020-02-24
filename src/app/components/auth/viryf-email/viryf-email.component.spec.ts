import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViryfEmailComponent } from './viryf-email.component';

describe('ViryfEmailComponent', () => {
  let component: ViryfEmailComponent;
  let fixture: ComponentFixture<ViryfEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViryfEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViryfEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
