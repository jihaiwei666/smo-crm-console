/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import Label from '../../../common/Label'

interface ProjectAssociateInfoProps {
  relationInfo?: any
}

class ProjectAssociateInfo extends React.Component<ProjectAssociateInfoProps> {
  render() {
    const {customers = [], contracts = []} = this.props.relationInfo

    return (
      <div className="--module-item">
        <div className="bb">
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
          <div className="p5 input-unit-illustrate">项目中关联该客户后，自动产生，不可修改</div>
        </div>

        <div className="mt10">
          <FlexDiv>
            <Label>关联合同</Label>
            <Part>
              {
                contracts.length != 0 && contracts.map(contract => {
                  return (
                    <div key={contract.contractId} className="associate-item">{contract.contractName}</div>
                  )
                })
              }
              {
                !contracts.length && (
                  <div className="associate-item">暂无关联信息</div>
                )
              }
            </Part>
          </FlexDiv>
          <div className="p5 input-unit-illustrate">合同中关联项目后，自动产生，不可修改</div>
        </div>
      </div>
    )
  }
}

export default ProjectAssociateInfo
