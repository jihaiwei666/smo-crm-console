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
import {FixHeadList, FixHead, FixBody, FixRow} from '../../../../components/fix-head-list/'
import Save from '../../../common/Save'

interface CDAProps {
}

class CDA extends React.Component<CDAProps> {
  render() {
    return (
      <div className="p5">
        <FixHeadList>
          <FixHead>
            <FixHead.Item></FixHead.Item>
            <FixHead.Item>起始日期</FixHead.Item>
            <FixHead.Item>结束日期</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
            <FixHead.Item>操作</FixHead.Item>
          </FixHead>
          <FixBody>
            <FixRow>
              <FixRow.Item></FixRow.Item>
              <FixRow.Item>2017-01-31</FixRow.Item>
              <FixRow.Item>2017-03-31</FixRow.Item>
              <FixRow.Item></FixRow.Item>
              <FixRow.Item></FixRow.Item>
            </FixRow>
          </FixBody>
        </FixHeadList>
        <div className="m10 text-right">
          <Button className="small">添加</Button>
        </div>
        <Save/>
      </div>
    )
  }
}

export default CDA
