import { Injectable } from '@angular/core';

export interface Task {
  id: number,
  projectId:number,
  title: string,
  description: string,
  assignee: string,
  dueDate: Date,
  status: 'To Do' | 'In Progress' | 'Done'
}
@Injectable()
export class TaskRepository {}
