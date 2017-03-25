import React from "react";
import { render } from "react-dom";
import { Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import { Provider } from "react-redux";

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
        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/repos">Repos</Link></li>
                    </ul>
                </menu>
                {this.props.children}
            </div>
        )
    }
}

export class About extends React.Component {
    render () {
        return (
            <h1>About1</h1>
        )
    }
}

export class Repos extends React.Component {
    render () {
        return (
            <h1>Repos1</h1>
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

render( <Router history={hashHistory}>{/*history版本问题*/}
            <Route path="/" component={Home}>
                <IndexRoute component={Default} />
                <Route path="about" component={About} />
                <Route path="repos" component={Repos} />
            </Route>
        </Router>, document.getElementById('root'))