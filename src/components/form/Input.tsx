/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import addFormSupport, {checkValid, defaultValueFormat} from 'app-core/core/hoc/addFormSupport'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  value?: string
  onChange?: (v) => void
  format?: RegExp | ((value) => boolean)
  width?: string
  valid?: boolean
  clsPrefix?: string
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    onChange: () => null,
    clsPrefix: 'default'
  }

  state = {
    touched: false
  }

  handleBlur = (e) => {
    this.setState({touched: true})
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  componentWillMount() {
    if (this.props.value == null) {
      // console.log((this.props.name || this.props.placeholder) + '\'s value is null !!!')
      // 将null，undefined重置为 空字符串
      this.props.onChange('')
    }
  }

  componentWillReceiveProps(nextProps: InputProps) {
    if (nextProps.value == null) {
      // console.log((nextProps.name || nextProps.placeholder) + '\'s value is null !!!')
    }
  }

  render() {
    const {value, width, className, valid, clsPrefix, onChange, format, ...otherProps} = this.props
    let invalid = false
    if (this.state.touched) {
      if (this.props.required && !valid) {
        invalid = true
      }
    } else {
      if (this.props.required && !valid && (value != '' && value != null)) invalid = true
    }

    let style: any = {}
    if (width) {
      style.width = width
    }

    return (
      <input
        {...otherProps}
        style={style}
        className={classnames('input', `${clsPrefix}-input`, className, {invalid: invalid})}
        value={this.props.value || ''}
        onBlur={this.handleBlur}
        onChange={e => this.props.onChange(e.target.value)}
      />
    )
  }
}

const noFormatRule = (required) => value => {
  if (required) {
    return defaultValueFormat(value)
  }
  return true
}

export default addFormSupport(Input, ({props}) => checkValid(props.format || noFormatRule(props.required), props.value))
