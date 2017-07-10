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

interface OperationRecordProps {
}

class OperationRecord extends React.Component<OperationRecordProps> {
  render() {
    return (
      <div className="p10 bb">
        <div className="clearfix">
          <div className="pull-left">weifeng.xing@tigermed.net</div>
          <div className="pull-right">2017-05-30 18:20</div>
        </div>
        <div>
          删除 联系人 “xxx”
        </div>
      </div>
    )
  }
}

export default OperationRecord
