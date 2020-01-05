import React from 'react';

import FriendsListItem from '../friends-list-item';
import './friends-list.css';

const FriendsList = ({ todos, onDeleted }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <FriendsListItem {...itemProps }
        onDeleted={() => onDeleted(id)} />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default FriendsList;