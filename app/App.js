import React from "react";
import {render} from 'react-dom';

// Parent Component
class GroceryList extends React.component {
  render() {
    return (
      <ul>
        <ListItem quantity="1">Bread</ListItem>
        <ListItem quantity="6">Eggs</ListItem>
        <ListItem quantity="2">Milk</ListItem>
      </ul>
    );
  }
}

// Child Component
class ListItem extends React.component {
  render() {
    return (
      <li>
        {this.props.quantity}× {this.props.children}
      </li>
    );
  }
}

render(<GroceryList />, document.getElementById('root'));
