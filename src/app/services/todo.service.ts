import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly url = 'http://localhost:3000/tasks';

  taskList: Observable<Todo[]> = new Observable<Todo[]>();

  search: string = '';

  constructor(private storage: LocalStorageService,
    private security: AuthenticationService,
    private notification: NotificationService,
    private http: HttpClient) {
    this.loadFromApi(this.url);
  }

  loadFromApi(url: string): void {
    this.taskList = this.http.get(url)
      .pipe(
        map((response: any) => this.todoMap(response)),
        tap((response: any) => console.log(response))
    );
  }

  todoMap(response: any): Todo[] {
    return response.map((item: any) => {
      return new Todo(item);
    });
  }

  getNewTodo(): Todo {
    return new Todo();
  }

  saveTask(data: Todo): void {
    if (! data.id) {
      this.http.post<Todo>(this.url, data).
        pipe(
          catchError((err, source) => {
            console.log(err);
            return source;
          })
        )
        .subscribe(
          (data) => {
            console.log('Inséré', data);
            this.loadFromApi(this.url);
          }
        );
    } else {
      this.http.put(this.url + '/' + data.id, data).subscribe(
        (data) => {
          console.log('Modifié', data);
          this.loadFromApi(this.url);
        }
      )
    }
  }

  deleteTask(id: number | undefined): void {
    const url = this.url + '/' + id;
    if (id == undefined) {
      return;
    }
    this.getOneById(id).subscribe(
      (task) => {
        if (task.user == this.security.user.login) {
          this.http.delete(url).subscribe(
            () => {
              this.loadFromApi(this.url);
            }
          );
        } else {
          this.notification.setMessage(`Vous n'avez pas les droits pour supprimer cette tâche`);
        }
      }
    );
  }

  getOneById(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.url + '/' + id);
  }

  filterTask(): void {
    let url = this.url;
    if (this.search) {
      url += '?user=' + this.search
    }
    this.loadFromApi(url); 
  }
}
