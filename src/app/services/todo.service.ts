import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Todo } from '../models/todo.model';

const TODO_KEY = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  taskList: Todo[] = [
    new Todo({ taskName: 'Faire le ménage', done: false, id: 1, user: 'Ada' }),
    new Todo({ taskName: 'Apprendre le polonais', done: false, id: 2, user: 'Alan' }),
  ];

  filteredTaskList: Todo[] = [];

  search: string = '';

  constructor(private storage: LocalStorageService) {
    this.loadFromStorage();
    this.filterTask();
  }

  loadFromStorage(): void {
    const rawData = this.storage.retrieve(TODO_KEY);
    if (rawData) {
      const data = JSON.parse(rawData);
      this.taskList = data;
    } 
  }

  persist() {
    this.storage.store(TODO_KEY, JSON.stringify(this.taskList));
  }

  getNewTodo(): Todo {
    return new Todo();
  }

  saveTask(data: Todo ): void {
    const taskExist = this.taskList.find(item => item.id == data.id);
    if (! taskExist) {
        this.taskList.push(data);
    }
    this.persist();
  }

  deleteTask(id: number | undefined): void {
    const index = this.taskList.findIndex(item => item.id == id);
    this.taskList.splice(index, 1);
    this.persist();
  }

  getOneById(id: number): Todo{
    const task = this.taskList.find(item => item.id == id);
    return task || new Todo();
  }

  filterTask(): void {
    if (this.search) {
      this.filteredTaskList = this.taskList.filter(
        item => item.user == this.search
      );
    } else {
      this.filteredTaskList = this.taskList;
    }
  }
}
