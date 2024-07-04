import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Project, Task } from './project.repository';
import { TaskService } from 'src/app/task/state/task.service';

const apiUrl = 'http://localhost:5000/projects';

/**
 * Service related to the i18n translations
 */
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectLength = new BehaviorSubject('default message');
  currentMessage = this.projectLength.asObservable();
  allTasks!:Task[]

  constructor(public http: HttpClient, private taskService:TaskService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams(),
  };

  getAllProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${apiUrl}`, this.httpOptions)
     .pipe(
        mergeMap(projects => {
          const projectObservables = projects.map(project => {
            return this.taskService.getAllTasks().pipe(
              map(tasks => {
                this.allTasks=tasks;
                const filteredTasks = tasks.filter(task => task.projectId === Number(project.id));
                return {
                  ...project,
                  tasks: filteredTasks
                };
              })
            );
          });
          return forkJoin(projectObservables);
        })
      );
  }

  getProjectWithID(id: number): Observable<Project> {
    return this.http
      .get<Project>(`${apiUrl}?id=${id}`, this.httpOptions)
      .pipe(
        tap({
          next: (response:any) => {
            response[0].tasks=this.allTasks.filter(task => task.projectId === Number(response[0].id))
            return response;
          },
        })
      );
  }

  setProjectID(id: string) {
    this.projectLength.next(id);
  }

  createProject(project: Project) {
    this.http.post(`${apiUrl}`, project).subscribe(
      (data) => {
        console.log('POST Request is successful ', data);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  updateProject(updatedProject: Project, id: number) {
    this.http
      .put<Project>(`${apiUrl}/${id}`, updatedProject)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  deleteProject(id: string): Observable<Project> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    let options = { headers: headers };
    return this.http.delete<Project>(`${apiUrl}/${id}`, options);
  }

}
