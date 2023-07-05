import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployEditComponent } from './employ-edit.component';

describe('EmployEditComponent', () => {
  let component: EmployEditComponent;
  let fixture: ComponentFixture<EmployEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
