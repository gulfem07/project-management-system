import { Component, Inject, OnInit } from '@angular/core';
import { TaskStatus } from '../task-add-component/task-add-component.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project/state/project.repository';
import { Task } from '../state/task.respository'
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/project/state/project.service';
import { TaskService } from '../state/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-edit-component',
  templateUrl: './task-edit-component.component.html',
  styleUrls: ['./task-edit-component.component.scss']
})
export class TaskEditComponentComponent implements OnInit {
  selectedProject:any;
  status: TaskStatus[] = [
    { type: 'To Do', text: 'Listeye Alındı' },
    { type: 'In Progress', text: 'Devam Ediliyor' },
    { type: 'Done', text: 'Bitirildi' },
  ];
  form= new FormGroup({
    project: new FormGroup({
      projectName: new FormControl<Project | null>(null, Validators.required),
      name: new FormControl('', Validators.required),
      assignee: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      dueDate: new FormControl(new Date(), Validators.required),
      status: new FormControl<TaskStatus | null>(null, Validators.required),
    }),
  });
  editedTask!: Task;
  sub!: Subscription;

  id: number = Math.floor(Math.random() * 1000 + 1);
  projectList!: Project[];
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskEditComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.projectService
      .getAllProjects().subscribe(value=>{this.projectList = value;
      })
      this.form.get('project.projectName')?.setValue(this.data.projectId.toString() as unknown as Project);
      this.form.get('project.name')?.setValue(this.data.title);
      this.form.get('project.assignee')?.setValue(this.data.assignee);
      this.form.get('project.desc')?.setValue(this.data.description);
      this.form.get('project.dueDate')?.setValue(this.data.dueDate);
      this.form.get('project.status')?.setValue(this.data.status as unknown as TaskStatus);
  }

  onSubmit() {
    this.editedTask = {
      id: this.data.id,
      projectId: Number(this.form.value.project?.projectName),
      title: this.form.value.project?.name,
      assignee: this.form.value.project?.assignee,
      description: this.form.value.project?.desc,
      dueDate: this.form.value.project?.dueDate,
      status: this.form.value.project?.status?this.form.value.project?.status:'To Do',
    } as Task;
    this.taskService.updateTask(this.editedTask, this.data.id)
    this.dialogRef.close();
  }

}
