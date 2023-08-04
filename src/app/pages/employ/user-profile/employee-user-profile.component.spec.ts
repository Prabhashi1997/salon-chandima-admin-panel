import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUserProfileComponent } from './employee-user-profile.component';

describe('UserProfileComponent', () => {
  let component: EmployeeUserProfileComponent;
  let fixture: ComponentFixture<EmployeeUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
