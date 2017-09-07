/**
 * Created by jiangyukun on 2017/7/5.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {showMessage, showSuccess, showWarning} from 'app-core/message/message.action'

import {clearState} from '../../actions/app.action'

export default function authorityAndFunction(Component, roleCode) {

  class AuthorityAndFunctionWrap extends React.Component<any> {
    static contextTypes = {
      store: PropTypes.any
    }

    render() {
      return (
        <Component
          {...this.props}
          roleCode={roleCode}
          showMessage={bindActionCreators(showMessage, this.context.store.dispatch)}
          showSuccess={bindActionCreators(showSuccess, this.context.store.dispatch)}
          showWarning={bindActionCreators(showWarning, this.context.store.dispatch)}
          clearState={bindActionCreators(clearState, this.context.store.dispatch)}
        />
      )
    }
  }

  return AuthorityAndFunctionWrap
}
