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
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import Save from '../../../common/Save'

interface SupplierProps {
}

class Supplier extends React.Component<SupplierProps> {
  render() {
    return (
      <div>
        <LabelAndInput label="供应商类别（*）" className="pt5 pb5 bb"/>
        <div className="p5">供应商信息：</div>
        <div className="bb">
          <FlexDiv>
            <div style={{width: '20px'}}>1</div>
            <Part className="bl">
              <InputGroup label="有效期限（!）">
                <LabelAndInput label="起始日期"/>
                <LabelAndInput label="结束日期"/>
                <LabelAndInput label="入选时间"/>
                <LabelAndInput1 label="是否固定">
                  <Radio.Group value="">
                    <Radio value="1">是</Radio>
                    <Radio value="2">否</Radio>
                  </Radio.Group>
                </LabelAndInput1>
                <LabelAndInput label="具体单价"/>
              </InputGroup>
              <InputGroup label="对接人信息（!）">
                <LabelAndInput label="对接人"/>
                <LabelAndInput label="电话"/>
                <LabelAndInput label="邮箱"/>
                <LabelAndInput label="职位"/>
                <TextAndButton text="请先完善联系人信息，之后才能选择该联系人">
                  <AddButton/>
                </TextAndButton>
              </InputGroup>
              <div>
                <TextAndButton text="点此添加按钮添加一条供应商信息">
                  <AddButton/>
                </TextAndButton>
              </div>
            </Part>
          </FlexDiv>
        </div>

        <LabelAndInput label="MSA（*）" className="pt5 pb5 bb"/>
        <InputGroup label="">
          <LabelAndInput label="起始日期"/>
          <LabelAndInput label="结束日期"/>
          <LabelAndInput1 label="MSA扫描件">

          </LabelAndInput1>
        </InputGroup>

        <TextAndButton text="只显示最近一条MSA信息，更多请点击查看更多按钮查看">
          <Button className="small">...查看更多</Button>
        </TextAndButton>
        <Save/>
      </div>
    )
  }
}

export default Supplier
