import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Task } from './task.respository';

const apiUrl = 'http://localhost:5000/tasks';

/**
 * Service related to the i18n translations
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams(),
  };

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${apiUrl}`, this.httpOptions).pipe(
      tap({
        next: (response) => {
          return response;
        },
      })
    );
  }

  createTask(task: Task) {
    this.http.post(`${apiUrl}`, task).subscribe(
      (data) => {
        console.log('POST Request is successful ', data);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  deleteTask(id: number): Observable<Task> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    let options = { headers: headers };
    return this.http.delete<Task>(`${apiUrl}/${id}`, options);
  }

  updateTask(updatedTask: Task, id: number) {
    this.http
      .put<Task>(`${apiUrl}/${id}`, updatedTask)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
