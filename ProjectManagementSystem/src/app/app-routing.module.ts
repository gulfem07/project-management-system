import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
