/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'

import Label from '../../../common/Label'

interface ContractAssociateInfoProps {
  relationInfo?: any
}

class ContractAssociateInfo extends React.Component<ContractAssociateInfoProps> {
  render() {
    const {projects = [], customers = []} = this.props.relationInfo

    return (
      <div className="--module-item">
        <div className="input-row">
          <FlexDiv>
            <Label>关联项目</Label>
            <Part>
              {
                projects.length != 0 && projects.map(project => {
                  return (
                    <div key={project.projectId} className="associate-item">{project.projectName}</div>
                  )
                })
              }
              {
                !projects.length && (
                  <div className="associate-item">暂无关联信息</div>
                )
              }
            </Part>
          </FlexDiv>
          <div className="tip">合同中关联项目后，自动产生，不可修改</div>
        </div>

        <div className="input-row no-border">
          <FlexDiv>
            <Label>关联客户</Label>
            <Part>
              {
                customers.length != 0 && customers.map(customer => {
                  return (
                    <div key={customer.customerId} className="associate-item">{customer.customerName}</div>
                  )
                })
              }
              {
                !customers.length && (
                  <div className="associate-item">暂无关联信息</div>
                )
              }
            </Part>
          </FlexDiv>
          <div className="tip">项目中关联该客户后，自动产生，不可修改</div>
        </div>
      </div>
    )
  }
}

export default ContractAssociateInfo
