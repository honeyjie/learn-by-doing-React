import React from "react";
import { render } from "react-dom";
import { Board } from "./board.js";
import "whatwg-fetch";
import "babel-polyfill";
import './main.scss'
import update from 'react-addons-update'
// If you're running the server locally, the URL will be, by default, localhost:3000 // Also, the local server doesn't need an authorization header.
// const API_URL = 'localhost://8081';
// const API_HEADERS = {
//   'Content-Type': 'application/json',
// Authorization: 'any-string-you-like'// The Authorization is not needed for local server };

export class BoardContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: [],
        }
    }
    addTask(cardId, taskName){
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        let newTask = {id: Date.now(), name: taskName, done: false};
        let nextState = update(this.state.cards, {
            [cardIndex]: {//表示数组中某项
               tasks: {$push: [newTask]} 
            }
        })
        this.setState({cards: nextState})
    }
    deleteTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId); //查找数组中元素的序号
        console.log(cardIndex);//取得该任务对应的cardid在state数据中的位置
        /*原始的写法
        var data = this.state.cards;
        var cardIndex;
        for(var i = 0; i< data.length; i++) {
            if (data[i].id === cardId) {
                cardIndex = i;
                break;
            }
        }*/
        //创建一个新的数组
        let nextState = update(this.state.cards, {
            [cardIndex]: {//表示数组中某项
               tasks: {$splice: [[taskIndex, 1]]} 
            }
        })
        this.setState({cards: nextState})
    }
    toggleTask(cardId, taskId, taskIndex) {
        //更新task.done
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newDoneValue;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done
                                return newDoneValue;
                            }//传递参数的写法,将现有值传进去后得到一个新值
                            // $set: !this.state.cards[cardIndex].tasks.done
                        }
                    }
                }
            }
        })
        this.setState({cards: nextState})
    }
    componentDidMount() {
        fetch('./cards.json')
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            this.setState({
                cards: data
            })
        }.bind(this)) //使用this先必须传递进去
        .catch((error) => {
            console.log('Error fetching and parsing data', error)
        })
    }
    render() {
        return <Board cards={this.state.cards} taskCallbacks={
            {toggle: this.toggleTask.bind(this),
             delete: this.deleteTask.bind(this),
                add: this.addTask.bind(this)}
        }/>
    }
}
render(<BoardContainer />, document.getElementById('root'))