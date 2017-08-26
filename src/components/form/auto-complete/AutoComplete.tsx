/**
 * Created by jiangyukun on 2017/8/26.
 */
import React from 'react'
import classnames from 'classnames'
import OuterClick from 'app-core/core/OuterClick'

interface AutoCompleteProps {
  placeholder?: string
  classNames?: string
  options: string[]
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  tabIndex?: number
}

class AutoComplete extends React.Component<AutoCompleteProps> {
  _input: HTMLInputElement
  state = {
    showMoreOptions: false
  }

  handleOptionClick = (value) => {
    this._input.focus()
    this.props.onChange(value)
  }

  handleFocus = () => {
    this.setState({showMoreOptions: true})
    this.props.onFocus()
  }

  render() {
    let matchOptions = this.props.options.filter(o => (o.indexOf(this.props.value.trim()) != -1 && o != this.props.value))
    return (
      <OuterClick onOuterClick={() => this.setState({showMoreOptions: false})}>
        <div className={classnames(this.props.classNames, 'auto-complete')}>
          <input
            ref={c => this._input = c}
            tabIndex={this.props.tabIndex}
            placeholder={this.props.placeholder}
            className="input"
            onFocus={this.handleFocus}
            value={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}
          />
          {
            <ul className={classnames('more-options', {'hidden': !this.state.showMoreOptions || matchOptions.length == 0})}>
              {
                matchOptions.map((item, index) => {
                  return (
                    <li key={index} className="option-item" onClick={() => this.handleOptionClick(item)}>
                      {item}
                    </li>
                  )
                })
              }
            </ul>
          }
        </div>
      </OuterClick>
    )
  }
}

export default AutoComplete
