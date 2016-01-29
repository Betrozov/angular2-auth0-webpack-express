import {Component, View, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http} from 'angular2/http';
import {contentHeaders} from '../../common/headers';
import {TodoInterface} from './todo.interface';

let template = require('./todo.html');
let css = require('./todo.css');

@Component({
  selector: 'todo'
})

@View({
  template: template,
  styles: [css]
})

export class TodoComponent implements OnInit {
  private http:Http;
  private parentRouter:Router;
  private todoList:TodoInterface[] = [];
  private editedTodo:TodoInterface;
  private originalEditTitle:string;
  private allChecked:boolean = false;
  private completedCount:number;

  constructor(_http:Http, _parentRouter:Router) {
    this.http = _http;
    this.parentRouter = _parentRouter;
  }

  ngOnInit():void {
    this.getTodoList();
  }

  getTodoList():void {
    this.http
      .get('/todo-list', {headers: contentHeaders})
      .map(res => res.json())
      .subscribe(
        res => {
          this.todoList = res.data;

          this.setValue(this.todoList);
        },
        error => {
          console.log(error);
        }
      );
  }

  addTodo(newTodo):void {
    let todo:TodoInterface = {completed: false, title: newTodo.value};

    this.http
      .post('/todo', JSON.stringify(todo), {headers: contentHeaders})
      .map(res => res.json())
      .subscribe(
        res => {
          this.todoList.push(res.data);
          newTodo.value = '';
          this.setValue(this.todoList);
        },
        error => {
          console.log(error);
        }
      );
  }

  removeTodo(todo?:TodoInterface):void {
    let todoListId:any = null;

    if (!todo) {
      todoListId = this.todoList.map(item => {
        if (item.completed) {
          return item._id;
        }
      });
    } else {
      todoListId = todo._id;
    }

    this.http
      .delete('/todo/' + todoListId, {headers: contentHeaders})
      .map(res => res.json())
      .subscribe(
        () => {
          this.todoList = this.todoList.filter(item => {
            return todoListId.indexOf(item._id) === -1;
          });

          this.setValue(this.todoList);
        },
        error => {
          console.log(error);
        }
      );
  }

  openEditTodo(todo:TodoInterface, element:HTMLInputElement):void {
    this.editedTodo = todo;
    this.originalEditTitle = todo.title;

    if (this.editedTodo) {
      setTimeout(() => {
        element.focus();
      }, 0);
    }
  }

  saveRenameTodo(todo:TodoInterface, event:string):void {
    if (event === 'escape') {
      this.editedTodo = null;
      todo.title = this.originalEditTitle;

      return;
    }

    this.http
      .put('/todo/' + todo._id, JSON.stringify(todo), {headers: contentHeaders})
      .map(res => res.json())
      .subscribe(
        () => {
          this.editedTodo = null;
        },
        error => {
          console.log(error);
        }
      );
  }

  toggleCompleted(todo:TodoInterface):void {
    todo.completed = !todo.completed;

    this.http
      .put('/todo/' + todo._id, JSON.stringify(todo), {headers: contentHeaders})
      .map(res => res.json())
      .subscribe(
        () => {
          this.todoList.forEach(item => {
            if (item._id === todo._id) {
              item.completed = todo.completed;
            }
          });

          this.setValue(this.todoList);
        },
        error => {
          console.log(error);
        }
      );
  }

  markAll(completed:boolean):void {
    this.http
      .put('/todo-list-mark', JSON.stringify({completed: !completed}), {headers: contentHeaders})
      .map(res => res.json())
      .subscribe(
        () => {
          this.todoList.forEach(todo => {
            todo.completed = !completed;
          });

          this.setValue(this.todoList);
        },
        error => {
          console.log(error);
        }
      );
  }

  setValue(todoList:TodoInterface[]):void {
    let remainingCount = todoList.filter(todo => {
      return todo.completed;
    }).length;

    this.allChecked = remainingCount === todoList.length;

    this.completedCount = todoList.length - remainingCount;
  }

  logout():void {
    this.http
      .get('/logout', {headers: contentHeaders})
      .map(res => res.json())
      .subscribe(
        () => {
          this.parentRouter.navigateByUrl('/login');
        },
        error => {
          alert(error);
          console.log(error);
        }
      );
  }
}

