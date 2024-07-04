import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  IRowNode,
} from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task } from '../state/task.respository';
import { TaskService } from '../state/task.service';
import { ActionsCellRendererComponent } from './action-cell-renderercomponent';
import { MatDialog } from '@angular/material/dialog';
import {
  TaskAddComponentComponent,
  TaskStatus,
} from '../task-add-component/task-add-component.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  rowData: Task[] = [];
  sub!: Subscription;
  context: any;
  constructor(public httpService: TaskService, public dialog: MatDialog) {
    this.context = { componentParent: this };
  }
  selectedFilter: string = 'all';
  gridApi!: GridApi;

  status: TaskStatus[] = [
    { type: 'To Do', text: 'Listeye Alındı' },
    { type: 'In Progress', text: 'Devam Ediliyor' },
    { type: 'Done', text: 'Bitirildi' },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { headerName: 'Görev İsmi', field: 'title', flex: 1,sortable:false, },
    { headerName: 'Atanan Kişi', field: 'assignee',sortable:false, },
    { headerName: 'Son Tarih', field: 'dueDate',sortable:false, width:130 },
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
      width: 75,
    },
  ];

  ngOnInit(): void {
    this.sub = this.httpService
      .getAllTasks()
      .subscribe((value) => (this.rowData = value));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskAddComponentComponent, {
      width: '500px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.sub.unsubscribe();
      this.ngOnInit();
    });
  }
  onRowUpdated() {}
  onGridReady(params: GridReadyEvent<Task[]>) {
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

  doesExternalFilterPass(node: IRowNode<Task>): boolean {
    if (node.data) {
      switch (selectedFilter) {
        case 'To Do':
          return node.data.status === 'To Do';
        case 'In Progress':
          return node.data.status === 'In Progress';
        case 'Done':
          return node.data.status === 'Done';
        default:
          return true;
      }
    }
    return true;
  }
}

var selectedFilter = 'all';
