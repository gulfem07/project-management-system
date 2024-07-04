import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';
import { ProjectAddComponentComponent } from './project-add-component/project-add-component.component';
import { ProjectDetailComponentComponent } from './project-detail-component/project-detail-component.component';
import { ProjectEditComponentComponent } from './project-edit-component/project-edit-component.component';
import { ProjectRepository } from './state/project.repository';
import { ProjectService } from './state/project.service';
import { AgGridModule } from '@ag-grid-community/angular';

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActionsCellRendererComponent } from './project-list-component/actions-cell-renderer.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

ModuleRegistry.registerModules([ClientSideRowModelModule]);


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectListComponentComponent,
    ProjectAddComponentComponent,
    ProjectDetailComponentComponent,
    ProjectEditComponentComponent,
    ActionsCellRendererComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers:[ProjectRepository, ProjectService]
})
export class ProjectModule { }
