import React from "react";
import { render } from "react-dom";

export class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            route: window.location.hash.substr(1)
        }
    }
    componentDidMount() {
        window.addEventListener('hashchange', () => {//监听hash改变
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    }
   render () {
        var Child;
        switch (this.state.route) {
            case '/about': Child = About; break;
            case '/repos': Child = Repos; break;
            default: Child = Default; //必须要有默认的
        }
        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><a href="#/about">About</a></li>
                        <li><a href="#/repos">Repos</a></li>
                    </ul>
                </menu>
                <Child />
            </div>
        )
    }
}

export class About extends React.Component {
    render () {
        return (
            <h1>About</h1>
        )
    }
}

export class Repos extends React.Component {
    render () {
        return (
            <h1>Repos</h1>
        )
    }
}

export class Default extends React.Component {
    render () {
        return (
            <h1>Default</h1>
        )
    }
}
render(<Home />, document.getElementById('root'))