import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddComponentComponent } from './task-add-component/task-add-component.component';
import { TaskEditComponentComponent } from './task-edit-component/task-edit-component.component';
import { AgGridModule } from '@ag-grid-community/angular';

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { TaskRepository } from './state/task.respository';
import { TaskService } from './state/task.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    TaskAddComponentComponent,
    TaskEditComponentComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    AgGridModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers:[TaskRepository, TaskService]
})
export class TaskModule { }
