import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoRoutingModule } from './todo-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodoTaskComponent } from './components/todo-task/todo-task.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent,
    FooterComponent,
    TodoTaskComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
