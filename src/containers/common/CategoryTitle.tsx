/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'

interface CategoryTitleProps {
  title: string
}

class CategoryTitle extends React.Component<CategoryTitleProps> {
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
