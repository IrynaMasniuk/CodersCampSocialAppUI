import React from 'react';

import './friends-list-item.css';

  
export default class FriendsListItem extends React.Component{ 

render(){
 const { label, onDeleted } = this.props;

  return (
    <span className="todo-list-item">
      <span
        className="todo-list-item-label">
        {label}
      </span>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDeleted}>
        <i className="fa fa-trash-o" />
      </button>
    </span>
  );
} 
};