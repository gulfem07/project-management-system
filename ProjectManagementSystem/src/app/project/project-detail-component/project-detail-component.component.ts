import { ColDef, ICellRendererParams } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionsCellRendererComponent } from '../project-list-component/actions-cell-renderer.component';
import { Project, Task } from '../state/project.repository';
import { ProjectService } from '../state/project.service';
import { ProjectStatus } from '../project-add-component/project-add-component.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-detail-component',
  templateUrl: './project-detail-component.component.html',
  styleUrls: ['./project-detail-component.component.scss'],
})
export class ProjectDetailComponentComponent implements OnInit, OnDestroy {
  projectID!: number;
  selectedProject!: Project;
  rowData!: Task[];
  routeSub!: Subscription;
  projectSub!: Subscription;
  status: ProjectStatus[] = [
    { type: 'Not Started', text: 'Başlanmadı' },
    { type: 'In Progress', text: 'Devam Ediliyor' },
    { type: 'Completed', text: 'Tamamlandı' },
  ];

  taskStatus: ProjectStatus[] = [
    { type: 'To Do', text: 'Listeye Alındı' },
    { type: 'In Progress', text: 'Devam Ediliyor' },
    { type: 'Done', text: 'Bitirildi' },
  ];

  colDefs: ColDef[] = [
    { headerName: 'Görevin İsmi', field: 'title', flex: 1,sortable:false, },
    { headerName: 'Atanan Kişi', field: 'assignee',sortable:false, },
    { headerName: 'Son Tarihi', field: 'dueDate',sortable:false, },
    {
      headerName: 'Durumu',
      field: 'status',
      cellRenderer: (params: ICellRendererParams) => {
        const id = this.taskStatus.findIndex(
          (item) => item.type === params.value
        );
        return this.taskStatus[id].text;
      },
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.routeSub = this.route.params.subscribe(
      (params: any) => (this.projectID = params['id'])
    );
  }
  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.projectSub = this.projectService
      .getProjectWithID(this.projectID)
      .subscribe((value: any) => {
        if (value) this.selectedProject = value[0];
        this.rowData = this.selectedProject.tasks;
        const id = this.status.findIndex(
          (item) => item.type === this.selectedProject.status
        );
        this.selectedProject.status = this.status[id].text as
          | 'Not Started'
          | 'In Progress'
          | 'Completed';
      });
  }
}
