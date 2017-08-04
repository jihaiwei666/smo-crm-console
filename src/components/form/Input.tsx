/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  value?: string
  onChange?: (v) => void
  format?: RegExp | ((value) => boolean)
  width?: string
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    onChange: () => null,
    format: value => value.trim().length != 0
  }
  static contextTypes = {
    setValid: PropTypes.func
  }

  state = {
    valid: true
  }

  componentWillMount() {
    if (this.props.required) {
      if (!this.props.name) {
        throw new Error('name is required when Input is required')
      }
      let valid = this._checkValid(this.props.format, this.props.value)
      this.setState({valid})
      if (this.context.setValid) {
        this.context.setValid(this.props.name, valid)
      }
    }
  }

  componentWillReceiveProps(nextProps: InputProps) {
    if (nextProps.required) {
      let valid = this._checkValid(nextProps.format, nextProps.value)
      if (valid != this.state.valid) {
        this.setState({valid})
        if (this.context.setValid) {
          this.context.setValid(this.props.name, valid)
        }
      }
    }
  }

  _checkValid = (format, value): boolean => {
    let valid = true
    if (format instanceof RegExp) {
      valid = format.test(value)
    } else if (format instanceof Function) {
      valid = format(value)
    }
    return valid
  }

  render() {
    const {width, className, onChange, ...otherProps} = this.props
    let style: any = {}
    if (width) {
      style.width = width
    }
    return (
      <input
        style={style}
        className={classnames('input', className)} {...otherProps}
        onChange={e => this.props.onChange(e.target.value)}
      />
    )
  }
}

export default Input
