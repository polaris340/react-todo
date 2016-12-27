import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoForm from './todo/TodoForm';
import TodoList from './todo/TodoList';


class App extends Component {
  constructor(props) {
    super(props);

    this._nextId = 1;

    let savedState = window.localStorage.getItem('state');

    if (savedState)
      this.state = JSON.parse(savedState);
    else
      this.state = {
        todos: [],
        showCompleted: true
      };

  }

  componentWillMount() {
    window.addEventListener('beforeunload', this.saveState.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveState.bind(this));
  }

  saveState() {
    window.localStorage.setItem(
      'state',
      JSON.stringify(this.state)
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>TODO</h2>
        </div>
        <div>
          <input type="checkbox"
                 checked={this.state.showCompleted}
                 onChange={e => this.setState({
                   showCompleted: !this.state.showCompleted
                 })}
          /> show completed
        </div>
        <TodoForm onSubmit={text => {
          if (!text.trim()) return;
          this.setState({
            todos: [
              ...this.state.todos,
              {
                id: this._nextId++,
                completed: false,
                text // text: text
              }
            ]
          });
        }}/>
        <TodoList
          todos={this.state.todos.filter(t => this.state.showCompleted || !t.completed)}
          removeTodo={todo => this.setState({
            todos: this.state.todos.filter(t => t !== todo)
          })}
          toggleCompleted={todo => {
            this.setState({
              todos: this.state.todos.map(t => {
                if (t === todo) {
                  return {
                    ...t,
                    completed: !t.completed
                  };
                } else {
                  return t;
                }
              })
            });
          }}
        />
      </div>
    );
  }
}

export default App;
