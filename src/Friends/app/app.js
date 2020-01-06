import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import FriendsList from '../friends-list';

import './app.css';

export default class Friends extends React.Component {
  
  maxId = 100;

  state = {
    todoData: [
    { label: 'alisia@gmail.com', id: 1 },
    { label: 'marszal15@gmail.com', id: 2 },
    { label: 'murat3456@gmail.com', id: 3 },
    { label: 'lukasmy@gmail.com', id: 4 },
    { label: 'sarahnot@gmail.com', id: 5 }
  ]
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const indx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0,indx), ...todoData.slice(indx+1)]
      
      return {
        todoData: newArray
      };
    });
  };

    addItem = (text) => {
      const newItem = {
        label: text,
        important: false, 
        id: this.maxId++
      };
      
      this.setState(({todoData}) => {
        const newArr = [
          ...todoData,
          newItem
        ]
        return {
          todoData:newArr
        };
      });

    }; 

render(){
  return (
    <div className="todo-app">
      <AppHeader/>
      <div className="top-panel d-flex">
        <SearchPanel onItemAdded={this.addItem} />
      </div>

      <FriendsList todos={this.state.todoData}
      onDeleted={ this.deleteItem } />
    </div>
  );
}
};