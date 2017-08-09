/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import PropTypes from 'prop-types'
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
  static contextTypes = {
    setValid: PropTypes.func
  }

  componentWillMount() {
    if (this.props.value == null) {
      // console.log((this.props.name || this.props.placeholder) + '\'s value is null !!!')
    }
  }

  componentWillReceiveProps(nextProps: InputProps) {
    if (nextProps.value == null) {
      // console.log((nextProps.name || nextProps.placeholder) + '\'s value is null !!!')
    }
  }

  render() {
    const {width, className, onChange, format, ...otherProps} = this.props
    let style: any = {}
    if (width) {
      style.width = width
    }
    return (
      <input
        style={style}
        className={classnames('input', className)} {...otherProps}
        value={this.props.value || ''}
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
