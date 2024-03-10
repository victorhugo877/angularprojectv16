import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TodoService } from 'src/lib/services/todo/todo.service';
import { FormBuilder } from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss']
})
export class TodoTaskComponent implements OnInit {

  public listTodo: TareaPendiente[] = [];
  public optionSelected:string = '';
  public maxIdArray:number | undefined = 0;
  public isDataTodo:boolean = false;
  public aceptDeleted:boolean = false;
  public idDeleted:number = 0;
  public idSelectType:number = 0;

  constructor(
    public readonly todoService: TodoService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private formTodoList: FormBuilder,
  ) { }
  public nameTaskTodo = this.formTodoList.group({
    nameTask: '',
  });
  ngOnInit(): void {

    this.getTask();
    this.changeDetectorRef.detectChanges();
  }
  addNewTodo():void {
    const nuevaTarea = new TareaPendiente(this.nameTaskTodo.value.nameTask as string);
    this.listTodo.push(nuevaTarea);
    this.todoService.guardarTareas(this.listTodo);
    this.alertWithSuccess();
    this.getTask();
    this.nameTaskTodo.controls.nameTask.setValue('');
  
    this.changeDetectorRef.detectChanges();
  }

  getTask(): void {
    this.listTodo = this.todoService.obtenerTareas();
    if(this.listTodo.length > 0){
      this.isDataTodo = true;
    }
    this.changeDetectorRef.detectChanges();
  }

 deletedTask(id:number | undefined):void {
    this.listTodo.splice(Number(id), 1);
    this.todoService.guardarTareas(this.listTodo);
 }

 trackById(index: number, listTodo: any): number {
  return listTodo.index;
 }

  cambiarEstadoDeTarea(){
    this.todoService.guardarTareas(this.listTodo);
  }

  alertWithSuccess(){
    Swal.fire('New Task ToDo...', 'Your task was created successfully!', 'success');
  }

  confirmBox(index:number){
    Swal.fire({
      title: 'Are you sure want to ToDo remove?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if(result?.isConfirmed) this.deletedTask(index)
    })
  }
}

export class TareaPendiente {
  public nombre: string
  public terminada: boolean
  constructor(nombre: string, terminada?: boolean) {
      this.terminada = terminada ? terminada : false;
      this.nombre = nombre;
  }
}