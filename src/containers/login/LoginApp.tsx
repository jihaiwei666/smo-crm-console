/**
 * Created by jiangyukun on 2017/4/6.
 */
import React, {Component} from 'react'
import {Provider} from 'react-redux'

import Form from './Form'

interface LoginAppProps {
  store: any
}

class LoginApp extends Component<LoginAppProps, any> {
  render() {
    return (
      <Provider store={this.props.store}>
        <Form/>
      </Provider>
    )
  }
}


export default LoginApp
