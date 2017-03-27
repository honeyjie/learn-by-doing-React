import { addTask, deleteTask, toggleTask } from '../actions'

const cards;
fetch('/cards.json')
.then(function(res) {
    return res.json();
})
.then(function(data) {
    cards = data;
}.bind(this)) //使用this先必须传递进去
.catch((error) => {
    console.log('Error fetching and parsing data', error)
})
function addTasks(state, action) {
    let cardIndex = state.cards.findIndex((card) => card.id == action.id);

    switch(action.type) {
        case "ADD_TASK":
            return update(state.cards, {
                        [cardIndex]: {//表示数组中某项
                        tasks: {$push: [newTask]} 
                    }
        case "DELETE_TASK":
            return update(state.cards, {
                        [cardIndex]: {//表示数组中某项
                            tasks: {$splice: [[action., 1]]} 
                        }
                    })
        case "TOGGLE_TASK":
            return update(state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        })
    }
}
const Tasks = (state = cards, action) => {
    switch(action.type) {
        case 'ADD_TASK':
        case "DELETE_TASK":
        case "TOGGLE_TASK":
            return addTasks(state, action)
    }
}
    // addTask(cardId, taskName){
    //     let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    //     let newTask = {id: Date.now(), name: taskName, done: false};
    //     let nextState = update(this.state.cards, {
    //         [cardIndex]: {//表示数组中某项
    //            tasks: {$push: [newTask]} 
    //         }
    //     })
    //     this.setState({cards: nextState})
    // }
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


export default combineReducers({
  Tasks
})

