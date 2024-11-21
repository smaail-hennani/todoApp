import Dexie, { Table } from 'dexie';
import { User } from '../models/user.model';
import { Todo } from '../models/todo.model';

export class AngularTodoDB extends Dexie {
  users!: Table<User, string>;
  todos!: Table<Todo, string>;
  constructor(){
    super('AngularTodoDB');
    this.version(1).stores({
      users: 'email, password',
      todos: '++id, userEmail, title, description, done'
    });
  };


}
