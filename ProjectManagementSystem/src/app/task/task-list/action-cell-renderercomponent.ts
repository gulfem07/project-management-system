import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../state/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditComponentComponent } from '../task-edit-component/task-edit-component.component';
import { Task } from '../state/task.respository';
import { ProjectService } from 'src/app/project/state/project.service';
import { Project } from 'src/app/project/state/project.repository';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  template: `<mat-icon matTooltip="Sil" (click)="deleteTask()">delete</mat-icon>
    <mat-icon matTooltip="Düzenle" (click)="editProject()">edit</mat-icon>`,
})
export class ActionsCellRendererComponent
  implements ICellRendererAngularComp, OnDestroy
{
  private params!: ICellRendererParams;
  id!: string;
  project!: Project;
  sub!: Subscription;
  dialogSub!: Subscription;

  constructor(
    private taskService: TaskService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.dialogSub) this.dialogSub.unsubscribe();
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.id = params.data.id;
  }

  deleteTask(): void {
    this.sub = this.taskService
      .deleteTask(this.params.data.id)
      .subscribe((data) => {});
    this.params.context.componentParent.rowData =
      this.params.context.componentParent.rowData.filter(
        (item: Task) => item !== this.params.data
      );
  }

  editProject() {
    const dialogRef = this.dialog.open(TaskEditComponentComponent, {
      width: '500px',
      height: '600px',
      data: this.params.data,
    });
    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      this.params.context.componentParent.ngOnInit();
    });
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}
