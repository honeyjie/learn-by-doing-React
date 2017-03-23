/*
* @Author: xiongjie
* @Date:   2017-03-22 01:39:49
 * @Last Modified time: 2017-03-23 11:56:13
*/

'use strict';
import React from "react";
import marked from "marked";
import "babel-polyfill";

export class Board extends React.Component {
    render() {
        return (
            <div className= "app">
                <List id="todo" title="To Do" cards={
                    this.props.cards.filter(
                        (card) => card.status === "todo" 
                    )
                } taskCallbacks={this.props.taskCallbacks} />
                <List id="in-progress" title="In Progress" cards={
                    this.props.cards.filter(
                        (card) => card.status === "in-progress" 
                    )
                } taskCallbacks={this.props.taskCallbacks} />
                <List id="done" title="Done" cards={
                    this.props.cards.filter(
                        (card) => card.status === "done" 
                    )
                } taskCallbacks={this.props.taskCallbacks} />
            </div>
        )
    }
}
Board.propTypes = {
    cards: React.PropTypes.arrayOf(React.PropTypes.object),
    taskCallbacks: React.PropTypes.object
}

class List extends React.Component {
    render() {
        var cards = this.props.cards.map((card) => {
            return <Card id={card.id} 
                title={card.title} 
                description={card.description} 
                color={card.color}
                tasks={card.tasks} key={card.id}
                taskCallbacks={this.props.taskCallbacks}
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
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks}/>
                </div>
            )
        }
        let sideColor = {
            position: 'absolute',
            width: "7px",//或者7
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: this.props.color
        }
        return (
            <div className="card">
                <div style={sideColor} />
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

Card.propTypes = {
    id: React.PropTypes.number,
    // title: React.PropType.string, 
    // description: React.PropTypes.string, 
    // color: React.PropTypes.string,
    tasks: React.PropTypes.array, 
    taskCallbacks: React.PropTypes.object,
}

class CheckList extends React.Component {
    checkInputKeyPress(e) {
        console.log("1", e.key)
        if (e.key.toLowerCase() === "enter") {//注意大小写
            console.log("1")
            this.props.taskCallbacks.add(this.props.cardId, e.target.value);
            e.target.value = '';
        }
    }
    render() {
        let tasks = this.props.tasks.map((task, taskIndex) => (
            <li className="CheckList_task" key={task.id}>
                <i className={task.done? "fa fa-check-square-o": "fa fa-square-o"} aria-hidden="true" onClick={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)}></i>
                <span>{task.name}</span>
                <a href="#" className="checklist_task_remove" onClick={
                    this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.Id, taskIndex)
                }/>
                <i className="fa fa-trash" aria-hidden="true" onClick={this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)}></i>
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text" className="addtask" placeholder="Type then hit Enter to add a task" onKeyPress={this.checkInputKeyPress.bind(this)} />
            </div>
        )
    }
}
CheckList.propTypes = {
    cardId: React.PropTypes.number, 
    taskCallbacks: React.PropTypes.object, 
    tasks: React.PropTypes.array
};
