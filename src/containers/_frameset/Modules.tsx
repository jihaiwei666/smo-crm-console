/**
 * Created by jiangyukun on 2017/7/21.
 */
import React from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom'

import pages from '../../core/pages'
import {getPath} from '../../core/env'
import CssTransition from '../../components/CssTransition'
import {roleCategory} from '../7-account-manage/account-manage.constant'
import CommonFunction from '../common/interface/CommonFunction'
import addCommonFunction from './addCommonFunction'
import {TODO_REMIND} from '../../core/constants/types'

interface ModulesProps extends CommonFunction {
  roleCode: number
  currentPath: string
  fetchUnreadRemindAmountSuccess: boolean
  unreadRemindAmount: number
  clearRemindAmount: () => void
}

class Modules extends React.Component<ModulesProps> {
  state = {
    open: true,
    unreadRemindAmount: 0
  }

  clearRemindAmount = () => {
    this.props.clearRemindAmount()
    this.setState({unreadRemindAmount: 0})
  }

  componentWillReceiveProps(nextProps: ModulesProps) {
    if (!this.props.fetchUnreadRemindAmountSuccess && nextProps.fetchUnreadRemindAmountSuccess) {
      this.setState({unreadRemindAmount: nextProps.unreadRemindAmount})
      this.props.clearState(TODO_REMIND.FETCH_UNREAD_REMIND_AMOUNT)
    }
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
              <li className={classnames({'active': currentPath == getPath(pages.todoRemind)})} onClick={this.clearRemindAmount}>
                <Link to={todoRemind}>待办提醒</Link>
                {
                  this.state.unreadRemindAmount != 0 && (
                    <div className="unread-amount">{this.state.unreadRemindAmount}</div>
                  )
                }
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.customer)})}>
                <Link to={customer}>客户</Link>
              </li>
              {
                this.props.roleCode != roleCategory.finance && (
                  <li className={classnames({'active': currentPath == getPath(pages.project)})}>
                    <Link to={project}>项目</Link>
                  </li>
                )
              }
              <li className={classnames({'active': currentPath == getPath(pages.contract)})}>
                <Link to={contract}>合同</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.report)})}>
                <Link to={report}>报表</Link>
              </li>
              {
                this.props.roleCode == roleCategory.systemManage && (
                  <li className={classnames({'active': currentPath == getPath(pages.recycleBin)})}>
                    <Link to={recycleBin}>回收站</Link>
                  </li>
                )
              }
              {
                this.props.roleCode == roleCategory.systemManage && (
                  <li className={classnames({'active': currentPath == getPath(pages.accountManage)})}>
                    <Link to={accountManage}>
                      账号管理
                    </Link>
                  </li>
                )
              }
            </ul>
          </main>
        </CssTransition>
      </div>
    )
  }
}

export default addCommonFunction(Modules)
