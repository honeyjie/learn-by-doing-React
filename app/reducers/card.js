import { addTask, deleteTask, toggleTask, showDetail} from '../actions'
import update from 'react-addons-update'
// import { combineReducers } from "react-redux";
// let nextTaskId = 0
// export const addTask = (text) => ({
//   type: 'ADD_TASK',
//   id: nextTaskId++,
//   text
// })
// export const deleteTask = (id, taskId, taskIndex) => ({
//   type: 'DELETE_TASK',
//   id,
//   taskId,
//   taskIndex
// })
// export const toggleTask = (id, taskId, taskIndex) => ({
//   type: 'TOGGLE_TASK',
//   id,
//   taskId,
//   taskIndex
// })
// const todo = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TASK':
//       return {
//         id: action.id,
//         text: action.text
//       }
//     case 'TOGGLE_TASK':
//       if (state.id !== action.id) {
//         return state
//       }

//       return {
//         // ...state,
//         completed: !state.completed
//       }
//     default:
//       return state
//   }
// }

const initailState = [
    {
        "id":1,
        "title":"Read the Book",
        "description":"I should read at least 50 pages",
        "color":"#66CCCC",
        "status":"in-progress",
        "showDetail": false,
        "tasks":[]
    },{
        "id":2,
        "title":"Write one article",
        "description":"Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
        "color":"#99CC33",
        "status":"todo",
        "showDetail": false,
        "tasks":[
            {
                "id":11,
                "name":"aaa",
                "done":true
            },{
                "id":21,
                "name":"bbb",
                "done":false
                }
            ]
    },{
        "id":3,
        "title":"Coding width React",
        "description":"learn React beacuse mylove",
        "color":"#663399",
        "status":"done",
        "showDetail": false,
        "tasks":[
            {
                "id":31,
                "name":"aaa",
                "done":true
            },{
                "id":41,
                "name":"bbb",
                "done":false
                }
            ]
    },{
        "id":4,
        "title":"Coding width React",
        "description":"learn React beacuse mylove",
        "color":"#663399",
        "status":"done",
        "showDetail": false,
        "tasks":[
            {
                "id":31,
                "name":"aaa",
                "done":true
            },{
                "id":41,
                "name":"bbb",
                "done":false
                }
            ]
    }
]
// console.log(cardId, taskId, taskIndex)
// //更新task.done
// let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
// let newDoneValue;
// let nextState = update(this.state.cards, {
//     [cardIndex]: {
//         tasks: {
//             [taskIndex]: {
//                 done: {
//                     $apply: (done) => {
//                         newDoneValue = !done
//                         return newDoneValue;
//                     }//传递参数的写法,将现有值传进去后得到一个新值
//                     // $set: !this.state.cards[cardIndex].tasks.done
//                 }
//             }
//         }
//     }
// })
function showDetail(state, action) {
    let cardIndex = state.findIndex((card) => card.id === action.id);
    let newDoneValue;
    let nextState = update(state, {
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
}
const todos = (state = initailState, action) => {
  switch (action.type) {
    // case 'ADD_T':
    //   return [
    //     // ...state,
    //     todo(undefined, action)
    //   ]
    // case 'TOGGLE_TODO':
    //   return state.map(t =>
    //     todo(t, action)
    //   )
    case SHOW_DETAIL:
      return showDetail(state, action)
    default:
      return state
  }
}

export default todos
// fetch('/cards.json')
// .then(function(res) {
//     return res.json();
// })
// .then(function(data) {
//     cards = data;
// }.bind(this)) //使用this先必须传递进去
// .catch((error) => {
//     console.log('Error fetching and parsing data', error)
// })

// export const addTask = (text) => ({
//   type: 'ADD_TASK',
//   id: nextTaskId++,
//   text
// })
// export const deleteTask = (id, taskId, taskIndex) => ({
//   type: 'DELETE_TASK',
//   id,
//   taskId,
//   taskIndex
// })
// export const toggleTask = (id, taskId, taskIndex) => ({
//   type: 'TOGGLE_TASK',
//   id,
//   taskId,
//   taskIndex
// })
// var Data = [{"id":1,"title":"Read the Book","description":"I should read at least 50 pages","color":"#66CCCC","status":"in-progress","tasks":[]},{"id":2,"title":"Write one article","description":"Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)","color":"#99CC33","status":"todo","tasks":[{"id":11,"name":"aaa","done":true},{"id":21,"name":"bbb","done":false}]},{"id":3,"title":"Coding width React","description":"learn React beacuse mylove","color":"#663399","status":"done","tasks":[{"id":31,"name":"aaa","done":true},{"id":41,"name":"bbb","done":false}]}]
// var cardData = Data;
// console.log(cardData)
// function addTasks(state = cardData, action) {
//     let cardIndex = state.cards.findIndex((card) => card.id == action.id);
//     switch(action.type) {
//         case "ADD_TASK":
//             let newTask = {id: Date.now(), name: taskName, done: false};
//             return update(state.cards, {
//                     [action.cardIndex]: {//表示数组中某项
//                     tasks: {$push: [newTask]} 
//                 }
//             })
//         case "DELETE_TASK":
//             return update(state.cards, {
//                 [action.cardIndex]: {//表示数组中某项
//                     tasks: {$splice: [[action.taskId, 1]]} 
//                 }
//             })
//         case "TOGGLE_TASK":
//             let newDoneValue;
//             return update(state.cards, {
//             [action.cardIndex]: {
//                 tasks: {
//                     [action.taskIndex]: {
//                         done: {
//                             $apply: (done) => {
//                                 newDoneValue = !done
//                                 return newDoneValue;
//                             }
//                         }
//                     }
//                 }
//             }
//         })
//         default:
//             return state;
//     }
// }
// export default addTasks;
// export default function Tasks(state = cards, action){
//     // switch(action.type) {
//     //     case 'ADD_TASK':
//     //     case "DELETE_TASK":
//     //     case "TOGGLE_TASK":
//             return addTasks(state, action)
//     // }
// }

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
    // deleteTask(cardId, taskId, taskIndex) {
    //     let cardIndex = this.state.cards.findIndex((card) => card.id == cardId); //查找数组中元素的序号
    //     console.log(cardIndex);//取得该任务对应的cardid在state数据中的位置
    //     /*原始的写法
    //     var data = this.state.cards;
    //     var cardIndex;
    //     for(var i = 0; i< data.length; i++) {
    //         if (data[i].id === cardId) {
    //             cardIndex = i;
    //             break;
    //         }
    //     }*/
    //     //创建一个新的数组
    //     let nextState = update(this.state.cards, {
    //         [cardIndex]: {//表示数组中某项
    //            tasks: {$splice: [[taskIndex, 1]]} 
    //         }
    //     })
    //     this.setState({cards: nextState})
    // }
    // toggleTask(cardId, taskId, taskIndex) {
    //     console.log(cardId, taskId, taskIndex)
    //     //更新task.done
    //     let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    //     let newDoneValue;
    //     let nextState = update(this.state.cards, {
    //         [cardIndex]: {
    //             tasks: {
    //                 [taskIndex]: {
    //                     done: {
    //                         $apply: (done) => {
    //                             newDoneValue = !done
    //                             return newDoneValue;
    //                         }//传递参数的写法,将现有值传进去后得到一个新值
    //                         // $set: !this.state.cards[cardIndex].tasks.done
    //                     }
    //                 }
    //             }
    //         }
    //     })
    //     this.setState({cards: nextState})
    // }


// export default combineReducers({
//   Tasks: Tasks
// })

