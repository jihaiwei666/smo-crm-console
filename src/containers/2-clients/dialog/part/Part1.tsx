/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'

import Input from '../../../../components/form/Input'
import Label from '../../../common/Label'
import InputUnit from '../../../common/InputUnit'
import Button from '../../../../components/button/Button'

interface Part1Props {

}

class Part1 extends React.Component<Part1Props> {
  render() {
    return (
      <div>
        <InputUnit>
          <FlexDiv>
            <Label>客户所有人：</Label>
            <Part>
              <Select1 options={[]} value={''} onChange={() => null}/>
            </Part>
          </FlexDiv>
          <div className="input-unit-illustrate">客户所有人为产生相关项目或产生MSA后，系统自动匹配BD，有争议时由BD负责人线下确认后修改</div>
        </InputUnit>

        <InputUnit className="clearfix">
          <FlexDiv>
            <Label>所属BDPC：</Label>
            <Part>
              <Select1 options={[]} value={''} onChange={() => null}/>
            </Part>
          </FlexDiv>
          <div className="input-unit-illustrate">确定所属BD后，由所属BD点击申请BDPC跟进，BDPC确认后产生。有争议时BDPC负责人确认后修改</div>
          <div className="pull-right">
            <Button className="small">申请BDPC跟进</Button>
          </div>

        </InputUnit>
        <div className="m10">
          <Button className="block">保存</Button>
        </div>
      </div>
    )
  }
}

export default Part1
