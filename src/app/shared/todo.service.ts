import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy{
  todos: Todo[] = [];
  

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  storageListenSub?: Subscription;
  constructor() {
    this.loadState();
    this.storageListenSub = fromEvent(window, 'storage').subscribe((event?:any) => {
      if (event?.key === 'todos') this.loadState();
    });
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((t) => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveState();
  }

  updateTodo(id: string, updateTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    Object.assign(todo, updateTodoFields);
    this.saveState();
  }

  DeleteTodo(id: string) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index == -1) return;
    this.todos.splice(index, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos')!);
      this.todos.length = 0;
      this.todos.push(...todosInStorage);
    } catch (e) {
      console.log('error');
      console.log(e);
    }
  }
}
