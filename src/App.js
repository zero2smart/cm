import React, { Component } from "react";
import moment from "moment";
import "./App.css";
import jquery from 'jquery';
const $ = window.$ = window.jQuery = jquery;

class TodoList extends React.Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem
          key={index}
          item={item}
          index={index}
          removeItem={this.props.removeItem}
          markTodoDone={this.props.markTodoDone}
        />
      );
    });
    return <ul className="list-group"> {items} </ul>;
  }
}

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render() {
    var todoClass = this.props.item.done ? "todoItem done" : "todoItem undone";
    return (
      <li className="list-group-item ">
        <div className={todoClass}>
          <span
            className="glyphicon glyphicon-ok icon"
            aria-hidden="true"
            onClick={this.onClickDone}
          />
          <span>{this.props.item.value}</span>
          <span class='date'>{`Added: ${this.props.item.date}`}</span>
          <button type="button" className="close" onClick={this.onClickClose}>
            &times;
          </button>
        </div>
      </li>
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    $("#itemName").focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = $("#itemName").val();

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      $('#todoForm').trigger("reset");
    }
  }
  render() {
    return (
      <form ref="form" id="todoForm" onSubmit={this.onSubmit} className="form-inline">
        <input
          type="text"
          id="itemName"
          className="form-control"
          placeholder="add a new todo..."
        />
        <button type="submit" className="btn btn-default">
          Add
        </button>
      </form>
    );
  }
}

class Timer extends React.Component {
  state = {count: 0}
  timer = null;

  updateTimer = () => {
    this.setState({
      count: this.state.count += 1
    });
  }

  componentDidMount = () => {
    const that = this;
    that.timer = setInterval(that.updateTimer, 1000);
  }

  render = () => {
    return (
      <div>
        <h2>Seconds so Far:</h2>
        <p>{this.state.count}</p>
      </div>
    );
  }
}

class TodoHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <h1>Todo list</h1>;
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = { todoItems: [], showTimer: false };
  }

  addItem(todoItem) {
    var todoItems = this.state.todoItems;
    todoItems.unshift({
      index: todoItems.length + 1,
      value: todoItem.newItemValue,
      date: moment().format("ll"),
      done: false
    });
    this.setState({ todoItems: todoItems });
  }

  removeItem(itemIndex) {
    var todoItems = this.state.todoItems;
    todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: todoItems });
  }

  markTodoDone(itemIndex) {
    const todoItems = this.state.todoItems;
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems });
  }

  render() {
    return (
      <div id="main">
        <TodoHeader />
        <button
          onClick={() => this.setState({ showTimer: !this.state.showTimer })}
        >
          Toggle Timer
        </button>
        {this.state.showTimer ? <Timer /> : null}
        <TodoList
          items={this.state.todoItems}
          removeItem={this.removeItem}
          markTodoDone={this.markTodoDone}
        />
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

export default TodoApp;
