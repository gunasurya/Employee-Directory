import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsContainerComponent } from './employee-details-container.component';

describe('EmployeeDetailsContainerComponent', () => {
  let component: EmployeeDetailsContainerComponent;
  let fixture: ComponentFixture<EmployeeDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
