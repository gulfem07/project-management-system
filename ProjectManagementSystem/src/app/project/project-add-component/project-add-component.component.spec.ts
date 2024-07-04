import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddComponentComponent } from './project-add-component.component';

describe('ProjectAddComponentComponent', () => {
  let component: ProjectAddComponentComponent;
  let fixture: ComponentFixture<ProjectAddComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAddComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
