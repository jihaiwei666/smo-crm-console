/**
 * Created by jiangyukun on 2017/8/10.
 */
import React from 'react'
import Button from '../../components/button/Button'

interface FilterButtonProps {
  onClick: () => void
}

class FilterButton extends React.Component<FilterButtonProps> {
  render() {
    return (
      <Button className="info" onClick={this.props.onClick}>
        <img className="btn-icon" src={require('./icon/filter.svg')}/>
        筛选
      </Button>
    )
  }
}

export default FilterButton
