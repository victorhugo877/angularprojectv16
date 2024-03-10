import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TareaPendiente } from 'src/app/small-features/todo/components/todo-task/todo-task.component';


@Injectable({
  providedIn: 'root'
})
export class TodoService {


 CLAVE_LOCAL_STORAGE = "tareas_angular"

  constructor() { }

  obtenerTareas(): TareaPendiente[] {
    return JSON.parse(localStorage.getItem(this.CLAVE_LOCAL_STORAGE) || "[]")
  }
  guardarTareas(tareas: TareaPendiente[]) {
    localStorage.setItem(this.CLAVE_LOCAL_STORAGE, JSON.stringify(tareas))
  }

}
