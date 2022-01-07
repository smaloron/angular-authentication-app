import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(public taskService: TodoService,
              private security: AuthenticationService,
    private router: Router,
  private notification: NotificationService) { }

  ngOnInit(): void {
  }

  editTask(task:Todo): void {
    if (task.user === this.security.user.login) {
      this.router.navigate(['/todo-form', task.id]);
    } else {
      this.notification.setMessage(`Vous ne pouvez pas modifier cette tâche`);
    }
  }

}
