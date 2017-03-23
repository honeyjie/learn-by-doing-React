/*
* @Author: xiongjie
* @Date:   2017-03-22 01:39:49
 * @Last Modified time: 2017-03-23 11:56:13
*/

'use strict';
import React from "react";
import marked from "marked";

export class Board extends React.Component {
    render() {
        return (
            <div className= "app">
                <List id="todo" title="To Do" cards={
                    this.props.cards.filter(
                        (card) => card.status === "todo" 
                    )
                } />
                <List id="in-progress" title="In Progress" cards={
                    this.props.cards.filter(
                        (card) => card.status === "in-progress" 
                    )
                } />
                <List id="done" title="Done" cards={
                    this.props.cards.filter(
                        (card) => card.status === "done" 
                    )
                } />
            </div>
        )
    }
}

class List extends React.Component {
    render() {
        var cards = this.props.cards.map((card) => {
            return <Card id={card.id} 
                            title={card.title} 
                            description={card.description} 
                            tasks={card.tasks} key={card.id}
                            /* 元素内部注释不需要引号*/
                            />
        });
        
        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}
class Card extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        }
    }
    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});//作为内部函数调用时要将正确的this传进去
    }
    render() {
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (
                <div className="card_details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            )
        }
        return (
            <div className="card">
                <i className= {this.state.showDetails ? "fa fa-caret-down": "fa fa-caret-right"}aria-hidden="true"></i>
                <div className="card_title" onClick={this.toggleDetails.bind(this)}>
                    {this.props.title}
                    {/* 添加注释*/}
                </div>
                {cardDetails}
            </div>
        )
    }
}
class CheckList extends React.Component {
    render() {
        let tasks = this.props.tasks.map((task) => (
            <li className="CheckList_task" key={task.id}>
                <i className={task.done? "fa fa-check-square-o": "fa fa-square-o"} aria-hidden="true"></i>
                <span>{task.name}</span>
                <a href="#" className="checklist_task_remove" />
                <i className="fa fa-trash" aria-hidden="true"></i>
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
            </div>
        )
    }
}
