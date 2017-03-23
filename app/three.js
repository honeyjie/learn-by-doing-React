/*
* @Author: xiongjie
* @Date:   2017-03-22 01:35:38
 * @Last Modified time: 2017-03-23 11:58:27
*/

'use strict';
import React from "react";
import { render } from "react-dom";

//入口文件，只渲染一个顶级组件和所需要的数据
import {Board} from "./board.js"
import './main.scss'

let cardsList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read at least 50 pages",
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write one article",
        description: "I should writedown what I learned today",
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

render(<Board cards={cardsList} />, document.getElementById('root'))
