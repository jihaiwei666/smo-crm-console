/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'

import './page-count-nav.scss'

interface PageCountNavProps {
  currentPage: number
  total: number
  onPageChange: (newPage: number) => void
}

class PageCountNav extends React.Component<PageCountNavProps> {

  render() {
    return (
      <ul className="page-count-nav">
        <li className="page">
          <a className="btn">上一页</a>
        </li>
        <li className="page">
          <a className="btn">1</a>
        </li>
        <li className="page">
          <a className="btn">2</a>
        </li>
        <li className="page">
          <a className="btn">3</a>
        </li>
        <li className="page">
          <a className="btn">下一页</a>
        </li>
      </ul>
    )
  }
}

export default PageCountNav
