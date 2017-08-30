/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import PropTypes from 'prop-types'

interface CategoryTitleProps {
  title: string
}

class CategoryTitle extends React.Component<CategoryTitleProps> {
  constructor(props, context) {
    super()
    context.addNavTitle(this)
  }

  static contextTypes = {
    addNavTitle: PropTypes.func
  }

  render() {
    return (
      <div className="category-title">
        <div className="icon"></div>
        <span>{this.props.title}</span>
      </div>
    )
  }
}

export default CategoryTitle
