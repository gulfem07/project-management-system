import { Injectable } from '@angular/core';


export interface Project {
  id: number,
  name: string,
  description: string,
  startDate: Date,
  endDate: Date,
  status: 'Not Started' | 'In Progress' | 'Completed',
  tasks: Task[]
}

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
export class ProjectRepository {}
