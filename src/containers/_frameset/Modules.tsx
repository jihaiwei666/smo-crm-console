/**
 * Created by jiangyukun on 2017/7/21.
 */
import React from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom'

import pages from '../../core/pages'
import {getPath} from '../../core/env'
import CssTransition from '../../components/CssTransition'

interface ModulesProps {
  currentPath: string
}

class Modules extends React.Component<ModulesProps> {
  state = {
    open: true
  }

  render() {
    const currentPath = this.props.currentPath

    const todoRemind = getPath(pages.todoRemind)
    const customer = getPath(pages.customer)
    const project = getPath(pages.project)
    const contract = getPath(pages.contract)
    const report = getPath(pages.report)
    const recycleBin = getPath(pages.recycleBin)
    const accountManage = getPath(pages.accountManage)

    return (
      <div className="modules">
        <header onClick={() => this.setState({open: !this.state.open})}>功能</header>

        <CssTransition visible={this.state.open} timeout={500}>
          <main>
            <ul className="nav-items">
              <li className={classnames({'active': currentPath == getPath(pages.todoRemind)})}>
                <Link to={todoRemind}>待办提醒</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.customer)})}>
                <Link to={customer}>客户</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.project)})}>
                <Link to={project}>项目</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.contract)})}>
                <Link to={contract}>合同</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.report)})}>
                <Link to={report}>报表</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.recycleBin)})}>
                <Link to={recycleBin}>回收站</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.accountManage)})}>
                <Link to={accountManage}>
                  账号管理
                </Link>
              </li>
            </ul>
          </main>
        </CssTransition>
      </div>
    )
  }
}

export default Modules
