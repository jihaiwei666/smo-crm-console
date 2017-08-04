/**
 * Created by jiangyukun on 2017/8/4.
 */
import React from 'react'

import Input, {InputProps} from './Input'

interface InputRequiredProps extends InputProps{

}

class InputRequired extends React.Component<InputRequiredProps> {
  render() {
    return (
      <Input {...this.props as any} required={true}/>
    )
  }
}

export default InputRequired
