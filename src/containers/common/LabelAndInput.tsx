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
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

class LabelAndInput extends React.Component<LabelAndInputProps> {
  render() {
    return (
      <FlexDiv className={classnames('mt5 mb5', this.props.className)}>
        <Label>{this.props.label + '：'}</Label>
        <Part>
          <Input
            placeholder="请输入" value={this.props.value}
            onChange={(e: any) => this.props.onChange(e.target.value)}
            disabled={this.props.disabled}
          />
        </Part>
      </FlexDiv>
    )
  }
}

export default LabelAndInput
