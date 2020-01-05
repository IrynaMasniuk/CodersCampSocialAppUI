import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
  };

  render(){
  return (
    <form className="btn-group"
    onSubmit={this.onSubmit}>
    <input type="text"
              className="form-control search-input"
              placeholder="Type your friend's email..."
              onChange={this.onLabelChange} />
      <button type="button"
              className="btn btn-info"
              onClick={this.onSubmit}>Add new friend</button>
    </form>
  );
}
};