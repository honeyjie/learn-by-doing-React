/*
* @Author: xiongjie
* @Date:   2017-03-22 01:05:59
* @Last Modified by:   xiongjie
* @Last Modified time: 2017-03-22 01:27:31
*/

'use strict';
import React from "react";
import {render} from "react-dom";//not import render from "react-dom"

class Ulist extends React.Component {
    render () {
        return (
            <ul>
                <ListItem num = "1"> One </ListItem>
                <ListItem num = "2"> Two </ListItem>
                <ListItem num = "3"> Three </ListItem>
            </ul>
        )
    }
}

class ListItem extends React.Component {
    render() {
        return (
            <li>{this.props.num}.{this.props.children}</li>
        )
    }
}

render(<Ulist />, document.getElementById('root'));