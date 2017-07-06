/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import classnames from 'classnames'

import './page-count-nav.scss'

interface PageCountNavProps {
  currentPage: number
  total: number
  onPageChange: (newPage: number) => void
}

class PageCountNav extends React.Component<PageCountNavProps> {

  render() {
    let totalPage = (this.props.total - 1) / 10
    let pageList = []
    for (let i = 0; i <= totalPage; i++) {
      pageList.push(i)
    }
    return (
      <div className="page-count-nav">
        <div className="page">
          <a>上一页</a>
          {
            pageList.map(p => {
              if (this.props.currentPage == p) {
                return (
                  <span key={p}>{p + 1}</span>
                )
              }
              return (
                <a key={p} onClick={() => this.props.onPageChange(p)}>{p + 1}</a>
              )
            })
          }
          <a className="">下一页</a>
        </div>
      </div>
    )
  }
}

export default PageCountNav
