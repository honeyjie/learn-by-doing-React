import React from 'react'
class Link extends React.Component {
    render() {
        if (this.props.active) {
            return <span>{this.props.children}</span>
        }
        return (
            <a href="#" onClick={this.props.setVisibilityFilter.bind(this, this.props.filter) }>
              {/*bind只传递参数进去，保证此处是函数而不是函数执行后的对象*/}
              {this.props.children}
            </a>
        )
    }
}
Link.propTypes = {
  active: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node.isRequired,
  setVisibilityFilter: React.PropTypes.func.isRequired
}

export default Link
