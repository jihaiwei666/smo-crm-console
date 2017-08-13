/**
 * Created by jiangyukun on 2017/8/13.
 */
import React from 'react'
import LimitTA, {LimitTextAreaProps as Props} from 'app-core/form/limit/LimitTextArea'
import addCommonFunction from '../../containers/_frameset/addCommonFunction'
import CommonFunction from '../../containers/common/interface/CommonFunction'

interface LimitTextAreaProps extends Props, CommonFunction {
  tip: string
}

class LimitTextArea extends React.Component<LimitTextAreaProps> {
  render() {
    let {tip, showWarning, showSuccess, showMessage, clearState, ...otherProps} = this.props
    return (
      <LimitTA {...otherProps as any}
               onExceed={() => this.props.showWarning(this.props.tip)}
      />
    )
  }
}

export default addCommonFunction(LimitTextArea)
