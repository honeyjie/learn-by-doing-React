/*
* @Author: xiongjie
* @Date:   2017-03-22 01:35:38
 * @Last Modified time: 2017-03-23 11:58:27
*/

'use strict';
// import React from "react";
// import { render } from "react-dom";
import React from "react";
import { render } from "react-dom";

//入口文件，只渲染一个顶级组件和所需要的数据

import { BoardContainer } from "./BoardContainer.js"
import './main.scss'

let cardsList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read at least 50 pages",
        color: "#66CCCC",
        status: "in-progress",
        tasks: [],
    },
    {
        id: 2,
        title: "Write one article",
        description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
        color: "#99CC33",
        status: "todo",
        tasks: [
            {
                id: 11,
                name: "aaa",
                done: true
            },
            {
                id: 21,
                name: "bbb",
                done: false
            }
        ]
    },
    {
        id: 3,
        title: "Coding width React",
        description: "learn React beacuse mylove",
        color: "#663399",
        status: "done",
        tasks: [
            {
                id: 31,
                name: "aaa",
                done: true
            },
            {
                id: 41,
                name: "bbb",
                done: false
            }
        ]
    },
]

var data = JSON.stringify(cardsList)
render(<BoardContainer />, document.getElementById('root'))
