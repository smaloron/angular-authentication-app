import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  task: Todo;

  update: boolean = false;

  constructor(private taskService: TodoService,
    private router: Router,
    private currentRoute: ActivatedRoute) {
    this.task = this.taskService.getNewTodo();

    currentRoute.params.subscribe(params => {
      const id = params['id'];
      this.task = this.taskService.getOneById(id);
    });
  }

  ngOnInit(): void { }
  
  validateForm() {
    this.taskService.saveTask(this.task);
    this.router.navigate(['/todo-list']);
  }

}
