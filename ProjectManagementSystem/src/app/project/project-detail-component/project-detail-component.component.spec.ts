import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponentComponent } from './project-detail-component.component';

describe('ProjectDetailComponentComponent', () => {
  let component: ProjectDetailComponentComponent;
  let fixture: ComponentFixture<ProjectDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDetailComponentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
