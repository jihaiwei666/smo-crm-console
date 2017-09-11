/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'

import Button from '../../../../components/button/Button'
import Company from './Company'

import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {CUSTOMER} from '../../../../core/constants/types'
import {addSubCompany, updateSubCompany, removeSubCompany} from '../../customer.action'
import crud from '../../../../core/crud'
import {lastItemIsLocal} from '../../../common/common.helper'

interface SubCompanyProps extends CommonFunction {
  customerId: string
  addSubCompany?: (options) => void
  addSubCompanySuccess?: boolean
  newSubCompanyId?: string
  updateSubCompany: (options) => void
  updateSubCompanySuccess?: boolean
  removeSubCompany: (companyId: string) => void
  removeSubCompanySuccess: boolean

  subCompanyList?: any[]
  editAuthority: boolean
}

let id = 1

class SubCompany extends React.Component<SubCompanyProps> {
  static defaultProps = {
    editAuthority: true
  }

  companyUid: 0
  lastCompanyId: ''
  state = {
    companyList: []
  }

  addCompany = () => {
    let companyList = this.state.companyList
    companyList.push({id: id++, companyId: null, crud: crud.ADD, isLocal: true})
    this.setState({companyList})
  }

  saveSubCompany = (id, options) => {
    this.companyUid = id
    this.props.addSubCompany(options)
  }

  removeSubCompany = (companyId) => {
    this.lastCompanyId = companyId
    this.props.removeSubCompany(companyId)
  }

  componentWillMount() {
    let subCompanyList = this.props.subCompanyList
    if (subCompanyList && subCompanyList.length != 0) {
      let companyList = subCompanyList.map(c => ({id: c.companyId, companyId: c.companyId}))
      this.setState({companyList: companyList})
    }
  }

  componentWillReceiveProps(nextProps: SubCompanyProps) {
    if (!this.props.addSubCompanySuccess && nextProps.addSubCompanySuccess) {
      this.props.showSuccess('添加子公司成功！')
      this.props.clearState(CUSTOMER.ADD_SUB_COMPANY)
      let companyList = this.state.companyList
      let match = companyList.find(c => c.id == this.companyUid)
      match.companyId = nextProps.newSubCompanyId
      match.crud = null
      this.setState({companyList})
    }
    if (!this.props.updateSubCompanySuccess && nextProps.updateSubCompanySuccess) {
      this.props.showSuccess('更新子公司信息成功！')
      this.props.clearState(CUSTOMER.UPDATE_SUB_COMPANY)
    }
    if (!this.props.removeSubCompanySuccess && nextProps.removeSubCompanySuccess) {
      this.props.showSuccess('删除子公司信息成功！')
      this.props.clearState(CUSTOMER.REMOVE_SUB_COMPANY)
      let companyList = this.state.companyList
      let index = companyList.indexOf(companyList.find(c => c.companyId == this.lastCompanyId))
      companyList.splice(index, 1)
      this.setState({companyList})
    }
  }

  _getCompanyInfo = (companyId) => {
    let companyInfo = null
    let subCompanyList = this.props.subCompanyList
    if (subCompanyList) {
      let match = subCompanyList.find(c => c.companyId == companyId)
      if (match) {
        let {companyId, ...other} = match
        companyInfo = other
      }
    }
    return companyInfo
  }

  render() {
    return (
      <div className="--module-item">
        {
          this.state.companyList.map((c, index) => {
            return (
              <Company key={c.isLocal ? c.id : c.companyId}
                       customerId={this.props.customerId}
                       companyId={c.companyId}
                       addCompany={(options) => this.saveSubCompany(c.id, options)}
                       companyInfo={this._getCompanyInfo(c.companyId)}
                       updateCompany={this.props.updateSubCompany}
                       removeCompany={this.removeSubCompany}
                       index={index}
                       editAuthority={this.props.editAuthority}
              />
            )
          })
        }
        <div className="clearfix m10">
          <span className="tip">录入分/子公司或下属院区信息，如果分/子公司或下属院区成单，则需新建客户处理</span>
          <div className="pull-right">
            <Button
              className="small" onClick={this.addCompany}
              disabled={!this.props.customerId || !this.props.editAuthority || lastItemIsLocal(this.state.companyList)}>
              添加
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.customer,
    customerId: props.customerId,
    subCompanyList: props.subCompanyList
  }
}

export default connect(mapStateToProps, {
  addSubCompany, updateSubCompany, removeSubCompany
})(addCommonFunction(SubCompany))
