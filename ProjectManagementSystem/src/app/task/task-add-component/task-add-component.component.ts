import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/project/state/project.service';
import { TaskService } from '../state/task.service';
import { Task } from '../state/task.respository';
import { Project } from 'src/app/project/state/project.repository';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export interface TaskStatus {
  type: string;
  text: string;
}
@Component({
  selector: 'app-task-add-component',
  templateUrl: './task-add-component.component.html',
  styleUrls: ['./task-add-component.component.scss'],
})
export class TaskAddComponentComponent implements OnInit, OnDestroy {
  status: TaskStatus[] = [
    { type: 'To Do', text: 'Listeye Alındı' },
    { type: 'In Progress', text: 'Devam Ediliyor' },
    { type: 'Done', text: 'Bitirildi' },
  ];
  form!: FormGroup;
  addedTask!: Task;
  sub!: Subscription;

  id: number = Math.floor(Math.random() * 1000 + 1);
  projectList!: Project[];
  constructor(
    private _router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskAddComponentComponent>
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.projectService
      .getAllProjects()
      .subscribe((value) => (this.projectList = value));
    this.form = new FormGroup({
      project: new FormGroup({
        projectName: new FormControl<Project | null>(null, Validators.required),
        name: new FormControl('', Validators.required),
        assignee: new FormControl('', Validators.required),
        desc: new FormControl('', Validators.required),
        dueDate: new FormControl(null, Validators.required),
        status: new FormControl<TaskStatus | null>(null, Validators.required),
      }),
    });
  }

  onSubmit() {
    this.addedTask = {
      id: Number(this.id),
      projectId: Number(this.form.value.project.projectName),
      title: this.form.value.project.name,
      assignee: this.form.value.project.assignee,
      description: this.form.value.project.desc,
      dueDate: this.form.value.project.dueDate,
      status: this.form.value.project.status,
    };
    this.taskService.createTask(this.addedTask);
    this.dialogRef.close();
  }
}
