import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import * as serviceWorker from './serviceWorker';
import { AiFillCloseCircle } from 'react-icons/ai';

class SubmitForm extends React.Component {
  state = { term: '' };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.term === '') return;
    this.props.onFormSubmit(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input type="text" className="input" placeholder='Enter Item'
          value={ this.state.term } onChange={ (e) => this.setState({ term: e.target.value }) } ></input>
        <input type="submit" />
      </form>
    );
  }
}

const Header = (props) => {
  return (
    <div className='card-header'>
      <h1 className='card-header-title header'>
        You have { props.numTodos } Todos
      </h1>
    </div>
  )
}

const ToDoList = (props) => {

  const todos = props.tasks.map((todo, index) => {
    return <Todo content={ todo } key={ index } id={ index } onDelete={ props.onDelete } />
  })
  return (
    <div className='list-wrapper'>
      { todos }
    </div>
  );

}

const Todo = (props) => {
  return (
    <div className='list-item'>
      { props.content }
      <span className="buttonc" onClick={ () => { props.onDelete(props.id) } }><AiFillCloseCircle /></span>
    </div >

  )
}

class App extends React.Component {
  state = { tasks: [ 'Meeting with Mr Trump', 'Feed the Alligator', 'Grocery Shopping', 'Sell-off Bitcoins' ] };
  render() {
    return (
      <div className='wrapper'>
        <div className='card frame'>
          <Header numTodos={ this.state.tasks.length } />
          <ToDoList tasks={ this.state.tasks } onDelete={ this.handleDelete } />
          <SubmitForm onFormSubmit={ this.handleSubmit } />
        </div>
      </div>
    );
  }

  handleDelete = (index) => {
    const newArray = [ ...this.state.tasks ];
    newArray.splice(index, 1);
    this.setState({ tasks: newArray });
  }

  handleSubmit = (task) => {
    this.setState({ tasks: [ ...this.state.tasks, task ] });
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



serviceWorker.unregister();
