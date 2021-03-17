import React from 'react';
import style from './style.css';
import { TodoModel } from 'app/models/TodoModel';

export namespace TodoList {
  export interface Props {
    todos: TodoModel[];
  }
}

export const TodoList = ({ todos }: TodoList.Props): JSX.Element => {
  return <section className={style.main}></section>;
};
