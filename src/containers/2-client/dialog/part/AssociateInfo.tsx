/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import Label from '../../../common/Label'

interface AssociateInfoProps {
}

class AssociateInfo extends React.Component<AssociateInfoProps> {
  render() {
    return (
      <div>
        <div className="bb">
          <FlexDiv>
            <Label>关联项目</Label>
            <Part>
              <div className="associate-item">关联项目名称1</div>
              <div className="associate-item">关联项目名称2</div>
              <div className="associate-item">关联项目名称3</div>
              <div className="associate-item">关联项目名称4</div>
              <div className="associate-item">关联项目名称5</div>
            </Part>
          </FlexDiv>
          <div className="p5 input-unit-illustrate">项目中关联该客户后，自动产生，不可修改</div>
        </div>

        <div>
          <FlexDiv>
            <Label>关联合同</Label>
            <Part>
              <div className="associate-item">尚无关联合同</div>
            </Part>
          </FlexDiv>
          <div className="p5 input-unit-illustrate">合同中关联项目后，自动产生，不可修改</div>
        </div>
      </div>
    )
  }
}

export default AssociateInfo
