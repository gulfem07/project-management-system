import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditComponentComponent } from './project-edit-component.component';

describe('ProjectEditComponentComponent', () => {
  let component: ProjectEditComponentComponent;
  let fixture: ComponentFixture<ProjectEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEditComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
