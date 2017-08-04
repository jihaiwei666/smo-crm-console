/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {Row, Part} from 'app-core/layout'

import Label, {LabelProps} from './Label'

interface InputGroupProps extends LabelProps {
  className?: string
  label: string
}

class InputGroup extends React.Component<InputGroupProps> {
  render() {
    return (
      <Row className={classnames('input-group', this.props.className)}>
        <Label inputType={this.props.inputType}>{this.props.label}</Label>
        <Part className="bl pl10">
          {this.props.children}
        </Part>
      </Row>
    )
  }
}

export default InputGroup
