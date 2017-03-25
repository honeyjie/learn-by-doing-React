import React from "react";
import { render } from "react-dom";
import "./animate.scss"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Animation extends React.Component {
    render() {
        return (
            <a href="#" className="button">Hover Me!
            </a>
        )
    }
}
export class Keyfram extends React.Component {
    render() {
        return (
            <div className="heart">&hearts;</div>
        )
    }
}
export class AnimationShopping extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: [
                {id: 1, name: 'Milk'},
                {id: 2, name: 'Yogurt'},
                {id: 3, name: 'Orange Juice'}
            ]
        }
    }
    handleChange(e) {
        if (e.key.toLowerCase() === "enter") {
            console.log("1");
            let newItem = {id: Date.now(), name: e.target.value}
            let newItems = this.state.items.concat(newItem);//返回新数组不改变原来数组

            e.target.value ="";
            this.setState({items: newItems})
        }
    }
    handleRemove(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }
    render() {
        // var shoppingItems = this.state.items.map((item, i) => (
        //     <li key={item.id} className="item">{item.name}</li>
        // ));//返回数据用()括起来而不是{}
        let items = this.state.items.map((item, i) => (
            <div className="item" key={item.id} onClick={this.handleRemove.bind(this)}>
                {item.name}
            </div>
        ));
        // console.log(this.state.items, shoppingItems)
        return (
            <div>
                <ReactCSSTransitionGroup 
                transitionName="example" 
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={300} 
                transitionLeaveTimeout={300}>
                {items}{/*直接包围被渲染元素*/}
                </ReactCSSTransitionGroup>
                <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
            </div>
        )
    }
}
export class ListItem extends React.Component {
    render() {
        return (
            <li key={this.props.key} className="item" >{this.props.itemName}</li>
        )
    }
} 
render(<AnimationShopping />, document.getElementById('root'))