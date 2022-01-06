import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  taskList: Todo[] = [
    new Todo({ taskName: 'Faire le ménage', done: false }),
    new Todo({ taskName: 'Apprendre le polonais', done: false }),
  ];

  constructor() { }

  getNewTodo(): Todo {
    return new Todo();
  }

  addTask(data: Todo): void {
    this.taskList.push(data);
  }
}
