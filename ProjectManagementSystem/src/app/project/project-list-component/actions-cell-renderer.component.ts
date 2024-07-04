import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../state/project.service';
import { Subscription } from 'rxjs';

@Component({
  template: `<mat-icon matTooltip="Sil" (click)="deleteProject(id)"
      >delete</mat-icon
    >
    <mat-icon matTooltip="Düzenle" (click)="editProject()">edit</mat-icon>
    <mat-icon matTooltip="Detayı Göster" (click)="showProjectDetail()"
      >details</mat-icon
    >`,
})
export class ActionsCellRendererComponent
  implements ICellRendererAngularComp, OnDestroy
{
  private params!: ICellRendererParams;
  id!: string;
  sub!: Subscription;

  constructor(
    private projectService: ProjectService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.id = params.data.id;
  }

  deleteProject(id: string): void {
    this.sub = this.projectService.deleteProject(id).subscribe((data) => {});
    this.params.context.componentParent.rowData =
      this.params.context.componentParent.rowData.filter(
        (item: Task) => item !== this.params.data
      );
  }

  editProject() {
    this._router.navigate(['projects/edit', this.params.data.id]);
  }

  showProjectDetail() {
    this._router.navigate(['/projects', this.params.data.id]);
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}
