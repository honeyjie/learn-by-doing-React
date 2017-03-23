/*
* @Author: xiongjie
* @Date:   2017-03-21 23:29:37
* @Last Modified by:   xiongjie
* @Last Modified time: 2017-03-22 00:54:28
*/

'use strict';
import React from "react";
import {render} from 'react-dom';

// Parent Component
class Hello extends React.Component {
  render() {
    var place = "World";
    return (
        <h1>Hello {place}!!</h1>
    )
  }
}


render(<Hello />, document.getElementById('root'));
