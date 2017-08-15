/**
 * Created by jiangyukun on 2017/8/14.
 */
import React from 'react'
import L_Input, {LimitInputProps as Props} from 'app-core/form/limit/LimitInput'

import addCommonFunction from '../../containers/_frameset/addCommonFunction'
import CommonFunction from '../../containers/common/interface/CommonFunction'

interface LimitInputProps extends CommonFunction, Props {
  tip: string
}

class LimitInput extends React.Component<LimitInputProps> {
  render() {
    let {tip, showWarning, showSuccess, showMessage, clearState, ...otherProps} = this.props
    return (
      <L_Input {...otherProps as any}/>
    )
  }
}

export default addCommonFunction(LimitInput)
