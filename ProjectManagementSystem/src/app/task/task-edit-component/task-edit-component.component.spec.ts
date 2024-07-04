import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditComponentComponent } from './task-edit-component.component';

describe('TaskEditComponentComponent', () => {
  let component: TaskEditComponentComponent;
  let fixture: ComponentFixture<TaskEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskEditComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
