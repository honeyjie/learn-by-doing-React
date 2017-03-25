import React from "react";
import { render } from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory} from 'react-router';
import { Provider } from "react-redux";

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
                        <li><Link to="/about" activeClassName="active">About</Link></li>
                        <li><Link to="/repos" activeClassName="active">Repos</Link></li>
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
        .then((res) => res.json())
        .then((data) => {
            this.setState({repositories: data})
        })
    }
    render () {
        let repos = this.state.repositories.map((repo) => (
            <li key={repo.id}>
                <Link to={"/repos/details/" + repo.name}>{repo.name}</Link>
            </li>
        ))
        return (
            <div>
                <h1>Github Repos</h1>
                <ul>
                    {repos}
                </ul>
                {this.props.children}
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
    constructor() {
        super(...arguments);
        this.state = {
            respository: {}
        }
    }

    fetchData(repo_name) {
        fetch('https://api.github.com/repos/pro-react/'+repo_name)
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                respository: data
            })
        })
    }
    //实例化时期
    componentDidMount() {
        let repo_name = this.props.params.repo_name;//params可通过属性取得
        console.log(repo_name);
        this.fetchData(repo_name)
    }
    //存在期,组件接收到一个新的prop时被执行
    componentWillReceiveProps(nextProps) {
        let repo_name = nextProps.params.repo_name;
        this.fetchData(repo_name)
    }

    render() {
        let stars = [];
        for (var i = 0; i < this.state.respository.stargazers_count; i++) {
            stars.push('★')
        }

        return (
            <div>
                <h2>{this.state.respository.name}</h2>
                <p>{this.state.respository.description}</p>
                <span>{stars}</span>
            </div>
        )
    }
} 
/*const Root = ({ store } => (
    <Provider store={store}>
        
    </Provider>
))*/
render( <Router history={browserHistory}>{/*history版本问题*/}
            <Route path="/" component={Home}>
                <IndexRoute component={Default} />
                <Route path="about" component={About} />
                <Route path="repos" component={Repos}>
                    <Route path="details/:repo_name" component={RepoDetail} />
                </Route>
            </Route>
        </Router>, document.getElementById('root'))