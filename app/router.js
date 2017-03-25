import React from "react";
import { render } from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory} from 'react-router';
import { Provider } from "react-redux";
import 'babel-polyfill';//使旧浏览器支持如find()类的方法

import "whatwg-fetch";

// let store = createStore();

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
                        <li><Link to="/about" activeStyle={{color: 'red'}}>About</Link></li>
                        <li><Link to="/repos" activeStyle={{color: 'red'}}>Repos</Link></li>
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
    constructor() {
        super(...arguments);
        this.state = {
            repositories: []
        }
    }
    componentDidMount() {
        fetch('https://api.github.com/users/pro-react/repos')
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Server response wasn't Ok")
            }
        })
        .then((data) => {
            this.setState({repositories: data})
        })
        .catch((error) => {
            this.props.history.pushState(null, '/error');
        })
    }
    render () {
        let repos = this.state.repositories.map((repo) => (
            <li key={repo.id}>
                <Link to={"/repo/" + repo.name} activeStyle={{color: 'red'}}>{repo.name}</Link>
            </li>
        ))
        // let child = this.props.children && 
        let child = this.props.children && React.cloneElement(this.props.children, {
            //复制子组件并添加父元素的属性
             repositories: this.state.repositories
        })
        return (
            <div>
                <h1>Github Repos</h1>
                <ul>
                    {repos}
                </ul>
                {child}
                {/*渲染子组件*/}
            </div>
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

export class RepoDetail extends React.Component {
    renderRepository() {
        console.log(this.props.repositories)
     
        let repository = this.props.repositories.find(
            (repo) => repo.name === this.props.params.repo_name);//找到数组中某个值
        console.log(repository, this.props.params.repo_name)
        let stars = [];
        for (var i = 0; i < repository.stargazers_count; i++) {
            stars.push('★')
        }
        return (
            <div>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <span>{stars}</span>
            </div>
        )
    }
    render() {
        if (this.props.repositories.length > 0) {
            return this.renderRepository();
        } else {
            return <h4>Loading...</h4>
        }
    }
} 

export class ServerError extends React.Component {
    render() {
        const styles = {
            root: {
                textAlign: "center"
            },
            alert: {
                fontSize: 80,
                fontWeight: 'bold',
                color: "#e9ab2d"
            }
        }
        return (
            <div style={styles.root}>
                <div style={styles.alert}>&#9888; </div>
                <h1>Ops, we have a problem</h1>
            </div>
        )
    }
}
render( <Router history={browserHistory}>{/*history版本问题*/}
            <Route path="/" component={Home}>
                <IndexRoute component={Default} />
                <Route path="about" component={About} />
                <Route path="repos" component={Repos}>
                    {/*配置绝对路径*/}
                    <Route path="/repo/:repo_name" component={RepoDetail} />
                </Route>
                <Route path="error" component={ServerError} />
            </Route>
        </Router>, document.getElementById('root'))