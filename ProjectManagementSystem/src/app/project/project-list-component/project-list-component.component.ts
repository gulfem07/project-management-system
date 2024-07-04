import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  IRowNode,
} from '@ag-grid-community/core';
import { Router } from '@angular/router';
import { ProjectService } from '../state/project.service';
import { Project } from '../state/project.repository';
import { ActionsCellRendererComponent } from './actions-cell-renderer.component';
import { ProjectStatus } from '../project-add-component/project-add-component.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list-component',
  templateUrl: './project-list-component.component.html',
  styleUrls: ['./project-list-component.component.scss'],
})
export class ProjectListComponentComponent implements OnInit, OnDestroy {
  context: any;
  sub!: Subscription;
  constructor(private _router: Router, public httpService: ProjectService) {
    this.context = { componentParent: this };
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectedFilter: string = 'all';

  status: ProjectStatus[] = [
    { type: 'Not Started', text: 'Başlanmadı' },
    { type: 'In Progress', text: 'Devam Ediliyor' },
    { type: 'Completed', text: 'Tamamlandı' },
  ];
  rowData: Project[] = [];
  gridApi!: GridApi;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { headerName: 'Proje İsmi', field: 'name', flex: 1, sortable:false, },
    { headerName: 'Başlangıç Tarihi', field: 'startDate',sortable:false, width:150},
    {
      headerName: 'Durumu',
      field: 'status',
      width:150,
      cellRenderer: (params: ICellRendererParams) => {
        const id = this.status.findIndex((item) => item.type === params.value);
        return this.status[id].text;
      },
    },
    {
      headerName: '',
      field: '',
      cellRenderer: ActionsCellRendererComponent,
      width: 100,
      sortable:false,
    },
  ];

  ngOnInit(): void {
    this.sub = this.httpService.getAllProjects().subscribe((value) => {
      this.rowData = value;
    });
  }

  addProject() {
    this.httpService.setProjectID((this.rowData.length + 1).toString());
    this._router.navigate(['/projects/add']);
  }
  onRowUpdated() {}

  onGridReady(params: GridReadyEvent<Project[]>) {
    this.gridApi = params.api;
  }

  externalFilterChanged(newValue: string) {
    selectedFilter = newValue;
    this.gridApi.onFilterChanged();
  }

  isExternalFilterPresent(): boolean {
    // if ageType is not everyone, then we are filtering
    return true;
  }

  doesExternalFilterPass(node: IRowNode<Project>): boolean {
    if (node.data) {
      switch (selectedFilter) {
        case 'Not Started':
          return node.data.status === 'Not Started';
        case 'In Progress':
          return node.data.status === 'In Progress';
        case 'Completed':
          return node.data.status === 'Completed';
        default:
          return true;
      }
    }
    return true;
  }
}

var selectedFilter = 'all';
