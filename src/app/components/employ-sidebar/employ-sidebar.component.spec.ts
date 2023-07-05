import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploySidebarComponent } from './employ-sidebar.component';

describe('EmploySidebarComponent', () => {
  let component: EmploySidebarComponent;
  let fixture: ComponentFixture<EmploySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
