/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import addFormSupport from 'app-core/core/hoc/addFormSupport'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  value?: string
  onChange?: (v) => void
  format?: RegExp | ((value) => boolean)
  width?: string
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    onChange: () => null,
    format: value => {
      if (value == null) return false
      if (typeof value == 'number') return true
      return value.trim().length != 0
    }
  }

  state = {
    touched: false
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
    const {width, className, onChange, format, ...otherProps} = this.props
    let valid = checkValid(this.props.format, this.props.value)
    let invalid = this.props.required && this.state.touched && !valid
    let style: any = {}
    if (width) {
      style.width = width
    }
    return (
      <input
        style={style}
        className={classnames('input', className, {invalid: invalid})} {...otherProps}
        value={this.props.value || ''}
        onBlur={() => this.setState({touched: true})}
        onChange={e => this.props.onChange(e.target.value)}
      />
    )
  }
}

function checkValid(format, value): boolean {
  let valid = true
  if (format instanceof RegExp) {
    valid = format.test(value)
  } else if (format instanceof Function) {
    valid = format(value)
  }
  return valid
}

export default addFormSupport(Input, ({props}) => checkValid(props.format, props.value))
