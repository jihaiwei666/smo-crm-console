/**
 * Created by jiangyukun on 2017/7/5.
 */
import React from 'react'
import PropTypes from 'prop-types'

export default function getRoleCode<T>(Component) {

  class RoleCode extends React.Component<any> {
    static contextTypes = {
      roleCode: PropTypes.number
    }

    render() {
      return (
        <Component
          {...this.props}
          roleCode={this.context.roleCode}
        />
      )
    }
  }

  return RoleCode
}
