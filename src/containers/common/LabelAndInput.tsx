/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {FlexDiv, Part} from 'app-core/layout'

import Label from './Label'
import Input from '../../components/form/Input'

interface LabelAndInputProps {
  label: string,
  className?: string
}

class LabelAndInput extends React.Component<LabelAndInputProps> {
  render() {
    return (
      <FlexDiv className={classnames('m5', this.props.className)}>
        <Label>{this.props.label + '：'}</Label>
        <Part>
          <Input placeholder="请输入"/>
        </Part>
      </FlexDiv>
    )
  }
}

export default LabelAndInput
