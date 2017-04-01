import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return ({
    active: ownProps.filter === state.visibilityFilter //仅当自身的filter属性与state中属性一致时，active
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
//   onClick: () => {
//     console.log(ownProps.filter)
//     console.log(setVisibilityFilter(ownProps.filter))
// /*
//   filter: "SHOW_ACTIVE"
//   type: "SET_VISIBILITY_FILTER"
// */
//     dispatch(setVisibilityFilter(ownProps.filter))//ownProps.filter = "SHOW_ALL",触发某个action类型
//   }

    return bindActionCreators(actions, dispatch)//此处不需要手动触发dispatch
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)//给Link组件添加属性，this.props.acive, this.onClick,点击的时候触发store

export default FilterLink
