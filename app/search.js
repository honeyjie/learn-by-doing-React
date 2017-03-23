/*
* @Author: xiongjie
* @Date:   2017-03-22 10:13:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-03-23 17:40:50
*/

'use strict';
import React from "react";
import {render} from "react-dom";
import 'whatwg-fetch';//处理请求和响应
import update from 'react-addons-update';//解决引用类型复制的问题

/*
var obj1;
var obj2 = update(obj1, 对应属性:{{$指令: 修改}})
$push/$unshitft/$splice/$set/$merge/$apply
*/

let contacts = [
{ name: "Cassio Zen", email: "cassiozen@gmail.com" },
{ name: "Dan Abramov", email: "gaearon@somewhere.com" },
{ name: "Pete Hunt", email: "floydophone@somewhere.com" },
{ name: "Paul O’Shannessy", email: "zpao@somewhere.com" },
{ name: "Ryan Florence", email: "rpflorence@somewhere.com" },
{ name: "Sebastian Markbage", email: "sebmarkbage@here.com" },
]

class ContactsAppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            contacts: []
        }
    }
    componentDidMount() {
        fetch('./contacts.json')
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            this.setState({
                contacts: data
            })
        }.bind(this)) //使用this先必须传递进去
        .catch((error) => {
            console.log('Error fetching and parsing data', error)
        })
    }
    
    render() {
        return (
            <ContactsAPP contacts={this.state.contacts} />
        )
    }
}

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "React"
        }
    }
    hanldeChange(e) {
        this.setState({searchTerm: e.target.value})
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.searchTerm} onChange={this.hanldeChange.bind(this)}/>
            </div>
        )
    }
}

class Focustext extends React.Component {
    handleClick() {
        this.refs.myTextInput.focus();
    }
    render() {
        return (
            <div>
                <input type="text" ref="myTextInput" />
                <button onClick={this.handleClick.bind(this)}>点击</button>
            </div>
        )
    }
}

class ContactsAPP extends React.Component {
    constructor() {
        super();
        this.state = {
            filterText: ''
        };
    } 
    handleUserInput(searchIterm) {
        this.setState({
            filterText: searchIterm
        })//在父元素中定义改变的state状态，使得重新渲染
    }//子元素如何改变父元素的state  
    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
                <ContactList contacts={this.props.contacts} filterText={this.state.filterText}/>
            </div>
        )
    }
}
ContactsAPP.propTypes = {
    contacts: React.PropTypes.arrayOf(React.PropTypes.object)
}
class SearchBar extends React.Component {
    handleChange(e) {
        this.props.onUserInput(e.target.value) //通过属性取得在父元素中定义的函数，传递参数执行
    }
    render() {
        return <input type="search" placeholder="search" value={this.props.filterText} onChange={this.handleChange.bind(this)}/>
    }
}
SearchBar.propTypes = {//驼峰式写法作为属性的propTypes,和作为对象的PropTypes不一样
    filterText: React.PropTypes.string.isRequired, //容易出错的大小写
    onUserInput: React.PropTypes.func.isRequired
}
class ContactList extends React.Component {
    render() {
        let filteredContacts = this.props.contacts.filter(
            (contact) => contact.name.indexOf(this.props.filterText) !== -1 
        )
        return (
            <ul>
                {/*this.props.contacts.map(
                    (contact)=> <li key={contact.id}>{contact.name}-{contact.emali}</li>
                ) not work!*/}
                {filteredContacts.map(
                    (contact) => <ContactItem 
                        key={contact.email}
                        name={contact.name}
                        email={contact.email}
                    />
                )}
            </ul>
        )
    }
}
class ContactItem extends React.Component{
    render() {
        return (
            <li key={this.props.email}>
                {this.props.name}-{this.props.email}
            </li>
        )
    }
}

render(<ContactsAppContainer/>, document.getElementById('root'));