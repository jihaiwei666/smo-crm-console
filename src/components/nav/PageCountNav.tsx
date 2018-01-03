/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import classnames from 'classnames'

import './page-count-nav.scss'
import {calculatePageIndex} from '../../core/utils/common'

interface PageCountNavProps {
  currentPage: number
  total: number
  onPageChange: (newPage: number) => void
}

class PageCountNav extends React.Component<PageCountNavProps> {

  render() {
    let totalPage = Math.ceil((this.props.total - 1) / 10)
    let pageList = calculatePageIndex(totalPage, this.props.currentPage + 1)

    return (
      <div className="page-count-nav">
        <div className="page">
          <button disabled={this.props.currentPage == 0}
                  onClick={() => this.props.onPageChange(this.props.currentPage - 1)}
          >上一页
          </button>
          {
            pageList.map((p, index) => {
              if (this.props.currentPage + 1 === p) {
                return (
                  <span key={p}>{p}</span>
                )
              } else if (p == '...') {
                return <a key={index + '...'}>...</a>
              }
              return (
                <a key={p} onClick={() => this.props.onPageChange(p - 1)}>{p}</a>
              )
            })
          }
          <button disabled={this.props.currentPage + 1 === totalPage}
                  onClick={() => this.props.onPageChange(this.props.currentPage + 1)}
          >下一页
          </button>
        </div>
      </div>
    )
  }
}

export default PageCountNav
