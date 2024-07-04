import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../state/project.service';
import { Subscription } from 'rxjs';

export interface ProjectStatus {
  type: string;
  text: string;
}
@Component({
  selector: 'app-project-add-component',
  templateUrl: './project-add-component.component.html',
  styleUrls: ['./project-add-component.component.scss'],
})
export class ProjectAddComponentComponent implements OnInit, OnDestroy {
  status: ProjectStatus[] = [
    { type: 'Not Started', text: 'Başlanmadı' },
    { type: 'In Progress', text: 'Devam Ediliyor' },
    { type: 'Completed', text: 'Tamamlandı' },
  ];
  form!: FormGroup;
  sub!: Subscription;
  id!: string;
  constructor(
    private projectService: ProjectService,
    private _router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  ngOnInit() {
    this.form = new FormGroup({
      project: new FormGroup({
        name: new FormControl('', Validators.required),
        desc: new FormControl('', Validators.required),
        startDate: new FormControl(null, Validators.required),
        endDate: new FormControl(null, Validators.required),
        status: new FormControl<ProjectStatus | null>(
          null,
          Validators.required
        ),
      }),
    });
  }

  onSubmit() {
    this.sub = this.projectService.currentMessage.subscribe(
      (value) => (this.id = value)
    );
    const addedProject = {
      id: Number(this.id),
      name: this.form.value.project.name,
      description: this.form.value.project.desc,
      startDate: this.form.value.project.startDate,
      endDate: this.form.value.project.endDate,
      status: this.form.value.project.status,
      tasks: [],
    };
    this.projectService.createProject(addedProject);
    this._router.navigate(['/projects']);
  }
}
