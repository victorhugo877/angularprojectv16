import { Component } from '@angular/core';
import { Todo } from 'src/lib/models/todo.model';
import { TodoService } from 'src/lib/services/todo/todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss']
})
export class TodoTaskComponent {

  constructor (
    private todoService: TodoService) {
  }

  ngOnInit(){}
  
  
}
