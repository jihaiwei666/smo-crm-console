/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {FlexDiv, Part} from 'app-core/layout'

import Label, {LabelProps} from './Label'
import Input, {InputProps} from '../../components/form/Input'

interface LabelAndInputProps extends LabelProps, InputProps {

}

class LabelAndInput extends React.Component<LabelAndInputProps> {
  static defaultProps = {
    placeholder: '请输入',
    width: '250px'
  }

  render() {
    const {className, inputType, label, ...otherProps} = this.props
    return (
      <FlexDiv className={classnames('label-and-input', className)}>
        <Label inputType={inputType}>{label}</Label>
        <Part>
          <Input {...otherProps as any} name={this.props.name || label}/>
        </Part>
      </FlexDiv>
    )
  }
}

export default LabelAndInput
