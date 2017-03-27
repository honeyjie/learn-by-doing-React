import React from "react";
import { render } from "react-dom";
import { Board, NewCard, EditCard} from "./board.js";
import "whatwg-fetch";
import './main.scss'
import update from 'react-addons-update'
import { Router, Route, Link, IndexRoute, browserHistory} from 'react-router';
import { Provider } from "react-redux";
import 'babel-polyfill';//使旧浏览器支持如find()类的方法

import "whatwg-fetch";

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
        console.log(cardId, taskId, taskIndex)
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

    addCard(card) {
        let prevState = this.state;
        if (card.id === null) {
            let card = Object.assign({}, card, {id: Date.now()});
        }

        let nextState = update(this.state.cards, {$push: [card]});
        this.setState({cards: nextState})
    }

    updateCard(card) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((c) => c.id == card.id);

        let nextState = update(
            this.state.cards, {
                [cardIndex]: {$set: card}
            }
        )

        this.setState({cards: nextState});
    }
    componentWillMount() {
        fetch('/cards.json')
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
        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards,
            taskCallbacks: {
                toggle: this.toggleTask.bind(this),
                delete: this.deleteTask.bind(this),
                   add: this.addTask.bind(this)
            },
            cardCallbacks: {
                addCard: this.addCard.bind(this),
                updateCard: this.updateCard.bind(this),
                // updateStatus: this.updateCardStatus.bind(this),
                // updatePosition: throttle(this.updateCardPosition.bind(this), 500),
                // persistMove: this.persistCardMove.bind(this)
            }
        })
        return kanbanBoard;
    }
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={BoardContainer} > 
                <Route path="/" component={Board}>
                    <Route path="new" component={NewCard} />
                    <Route path="edit/:card_id" component={EditCard} /> 
                </Route>
            </Route> 
        </Router>
    </Provider>
, document.getElementById('root'));
// render(<BoardContainer />, document.getElementById('root'))