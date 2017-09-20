/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import addFormSupport, {checkValid} from 'app-core/core/hoc/addFormSupport'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  value?: string
  onChange?: (v) => void
  format?: RegExp | ((value) => boolean)
  width?: string
  valid?: boolean
  clsPrefix?: string
}

function defaultFormat(value) {
  if (value == null) return false
  if (typeof value == 'number') return true
  return value.trim().length != 0
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
    const {width, className, valid, clsPrefix, onChange, format, ...otherProps} = this.props
    let invalid = this.props.required && this.state.touched && !valid
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
    return defaultFormat(value)
  }
  return true
}

export default addFormSupport(Input, ({props}) => checkValid(props.format || noFormatRule(props.required), props.value))
