import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectAddComponentComponent } from './project-add-component/project-add-component.component';
import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';
import { ProjectEditComponentComponent } from './project-edit-component/project-edit-component.component';
import { ProjectDetailComponentComponent } from './project-detail-component/project-detail-component.component';

const routes: Routes = [{ path: '', component: ProjectListComponentComponent, },
  { path: 'add', component: ProjectAddComponentComponent},
  { path: 'edit/:id', component: ProjectEditComponentComponent},
  { path: ':id', component: ProjectDetailComponentComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
