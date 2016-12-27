import React, {Component} from 'react';

export default class TodoList extends Component {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    toggleCompleted: React.PropTypes.func.isRequired,
    removeTodo: React.PropTypes.func.isRequired
  };

  render() {
    return <div>
      {this.props.todos.map((todo, i) => <div key={todo.id.toString()}>
        <input type="checkbox"
               checked={todo.completed}
               onChange={e => this.props.toggleCompleted(todo)}
        />{todo.text}
          <button onClick={e => this.props.removeTodo(todo)}>x</button>
        </div>)}
    </div>;
  }
}