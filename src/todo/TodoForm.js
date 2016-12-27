import React from 'react';


export default class TodoForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      todoText: ''
    };
  }

  render() {
    return <form
      onSubmit={e => {
      e.preventDefault();

      this.props.onSubmit && this.props.onSubmit(this.state.todoText);
      this.setState({
        todoText: ''
      });
    }}>
      <input type="text" placeholder="todo"
        onChange={e => {
          this.setState({
            todoText: e.target.value
          });
        }}
             value={this.state.todoText}
      />
      <button type="submit"

      >Add</button>
    </form>;
  }
}