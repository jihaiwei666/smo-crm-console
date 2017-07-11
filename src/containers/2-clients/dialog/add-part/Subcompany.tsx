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

interface SubcompanyProps {
}

class Subcompany extends React.Component<SubcompanyProps> {
  render() {
    return (
      <div>
        <FlexDiv style={{borderBottom: '1px solid #ddd'}}>
          <div className="serial-number"></div>
          <Part style={{borderLeft: '1px solid #ddd'}}>
            <LabelAndInput label="名称"/>
            <div className="row-line"></div>
            <InputGroup label="联系人信息">
              <LabelAndInput label="联系人"/>
              <LabelAndInput label="电话"/>
              <LabelAndInput label="邮箱"/>
            </InputGroup>

            <InputGroup label="开票信息">
              <LabelAndInput label="纳税人识别号"/>
              <LabelAndInput label="开户银行"/>
              <LabelAndInput label="开户银行账号"/>
              <LabelAndInput label="开票地址"/>
              <LabelAndInput label="电话"/>
              <LabelAndInput label="发票邮寄地址"/>
              <LabelAndInput label="发票接收人"/>
              <LabelAndInput label="接收人联系方式"/>
            </InputGroup>
            <div className="m10">
              <Button className="block">保存</Button>
            </div>
          </Part>
        </FlexDiv>
        <div className="clearfix m10">
          <span className="input-unit-illustrate">录入分/子公司或下属院区信息，如果分/子公司或下属院区成单，则需新建客户处理</span>
          <div className="pull-right"><Button className="small">添加</Button></div>
        </div>
      </div>
    )
  }
}

export default Subcompany
