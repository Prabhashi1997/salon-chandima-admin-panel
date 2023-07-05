import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployLayoutComponent } from './employ-layout.component';

describe('EmployLayoutComponent', () => {
  let component: EmployLayoutComponent;
  let fixture: ComponentFixture<EmployLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
