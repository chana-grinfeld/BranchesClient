import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesDetailsComponent } from './branches-details.component';

describe('BranchesDetailsComponent', () => {
  let component: BranchesDetailsComponent;
  let fixture: ComponentFixture<BranchesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchesDetailsComponent]
    });
    fixture = TestBed.createComponent(BranchesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
